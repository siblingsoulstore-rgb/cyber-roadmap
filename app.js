(() => {
  "use strict";
  const R = window.ROADMAP;
  const CFG = window.APP_CONFIG || {};
  const TARGET = Number(CFG.WEEKLY_HOURS_TARGET) || 12;
  const LS_STATE = "cyber-roadmap-progress-v1";
  const LS_META = "cyber-roadmap-sync-meta-v1";
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // ---------- storage helpers (never throw) ----------
  const lsGet = (k, fallback) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; } catch { return fallback; } };
  const lsSet = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

  const blank = () => ({ checked: {}, hours: {}, updatedAt: 0 });
  const normalize = (s) => ({ checked: (s && s.checked) || {}, hours: (s && s.hours) || {}, updatedAt: Number(s && s.updatedAt) || 0 });
  let state = normalize(lsGet(LS_STATE, blank()));
  let meta = lsGet(LS_META, { userId: null, lastSyncedAt: 0 });

  // ---------- derived data ----------
  const allWeeks = R.phases.flatMap((p) => p.weekList.map((w) => ({ ...w, phase: p })));
  const weekTaskIds = (w) => w.tasks.map((t) => t[0]);
  const phaseTaskIds = (p) => p.weekList.flatMap(weekTaskIds);
  const allTaskIds = R.phases.flatMap(phaseTaskIds);
  const countDone = (ids) => ids.filter((id) => state.checked[id]).length;
  const pct = (ids) => (ids.length ? Math.round((countDone(ids) / ids.length) * 100) : 0);

  // ---------- render static-from-data parts ----------
  function checkItem(id, html, extra = "") {
    return `<li><label class="check"><input type="checkbox" data-id="${esc(id)}"><span>${html}${extra}</span></label></li>`;
  }

  function render() {
    $("#outcomes").innerHTML = R.outcomes.map((o) => `<li>${esc(o)}</li>`).join("");
    $("#flow").innerHTML = R.phases.map((p) =>
      `<a href="#${p.id}" style="--pc:var(--${p.id})"><div class="fw">${esc(p.weeks)}</div><div class="ft">${p.num} · ${esc(p.title)}</div></a>`).join("");

    const firstOpen = allWeeks.find((w) => countDone(weekTaskIds(w)) < w.tasks.length);
    $("#phases").innerHTML = R.phases.map((p) => `
      <section class="block" id="${p.id}" style="--pc:var(--${p.id})">
        <div class="phase-head">
          <div class="phase-num">${p.num}</div>
          <div class="grow"><div class="eyebrow" style="color:var(--pc)">${esc(p.weeks)}</div><h2 style="margin:0">Phase ${p.num}: ${esc(p.title)}</h2></div>
          <div class="ring" data-phase-pct="${p.id}">0%</div>
        </div>
        <div class="bar" style="margin:14px 0"><i data-phase-bar="${p.id}" style="background:var(--pc)"></i></div>
        <p>${esc(p.goal)}</p>
        <div class="weeks">
          ${p.weekList.map((w) => `
          <details class="week" data-week="${w.n}" ${firstOpen && firstOpen.n === w.n ? "open" : ""}>
            <summary><span class="wk">WEEK ${w.n}</span><span class="t">${esc(w.topics)}</span><span class="c" data-week-count="${w.n}"></span></summary>
            <div class="week-body">
              <div><div class="sublabel">Hands-on targets</div><ul class="tasks">${w.tasks.map((t) => checkItem(t[0], esc(t[1]))).join("")}</ul></div>
              ${w.tip ? `<div class="tip">💡 ${esc(w.tip)}</div>` : ""}
              <div><div class="sublabel">Resources</div><div class="links">
                ${w.res.map((r) => `<a class="chip" href="${esc(r[1])}" target="_blank" rel="noopener">${esc(r[0])}</a>`).join("")}
                ${w.hi.map((r) => `<a class="chip hi" href="${esc(r[1])}" target="_blank" rel="noopener" title="Hindi / Hinglish">HI · ${esc(r[0])}</a>`).join("")}
              </div></div>
              <label class="hours-input">Hours studied this week
                <input type="number" min="0" max="80" step="0.5" inputmode="decimal" data-hours="${w.n}" placeholder="0"> / ${TARGET}
              </label>
            </div>
          </details>`).join("")}
        </div>
        <div class="callout"><b>End-of-phase check:</b> ${esc(p.check)}</div>
        <div class="callout">${p.note}</div>
      </section>`).join("");

    $("#portfolioList").innerHTML = R.portfolio.map((t) => checkItem(t[0], esc(t[1]))).join("");
    $("#courseraList").innerHTML = R.coursera.map((c) =>
      checkItem(c[0], `<a href="${esc(c[3])}" target="_blank" rel="noopener">${esc(c[1])}</a>`, ` <span class="tip">· ${esc(c[2])}</span>`)).join("");
    $("#writeupList").innerHTML = R.writeup.map((w) => `<li>${esc(w)}</li>`).join("");
    $("#reflectList").innerHTML = R.reflection.map((w) => `<li>${esc(w)}</li>`).join("");
    $("#repoTree").textContent = R.repoTree;
    $("#hoursLabels").innerHTML = allWeeks.map((w) => `<span>W${w.n}</span>`).join("");
    applyState();
  }

  // ---------- reflect state into the DOM ----------
  function applyState() {
    $$("input[data-id]").forEach((el) => { el.checked = !!state.checked[el.dataset.id]; });
    $$("input[data-hours]").forEach((el) => {
      if (document.activeElement === el) return;
      const v = state.hours[el.dataset.hours];
      el.value = v ? v : "";
    });
    updateProgress();
  }

  function updateProgress() {
    const done = countDone(allTaskIds), total = allTaskIds.length, overall = pct(allTaskIds);
    const hoursTotal = allWeeks.reduce((s, w) => s + (Number(state.hours[w.n]) || 0), 0);
    const current = allWeeks.find((w) => countDone(weekTaskIds(w)) < w.tasks.length);

    allWeeks.forEach((w) => {
      const ids = weekTaskIds(w), d = countDone(ids);
      const c = $(`[data-week-count="${w.n}"]`); if (c) c.textContent = `${d}/${ids.length}${d === ids.length ? " ✓" : ""}`;
      const card = $(`details[data-week="${w.n}"]`); if (card) card.classList.toggle("done", d === ids.length);
    });
    R.phases.forEach((p) => {
      const v = pct(phaseTaskIds(p));
      $$(`[data-phase-pct="${p.id}"]`).forEach((el) => (el.textContent = v + "%"));
      $$(`[data-phase-bar="${p.id}"]`).forEach((el) => (el.style.width = v + "%"));
      $$(`[data-pct="${p.id}"]`).forEach((el) => (el.textContent = v + "%"));
    });
    $$('[data-pct="pf"]').forEach((el) => (el.textContent = pct(R.portfolio.map((x) => x[0])) + "%"));
    $$('[data-pct="cs"]').forEach((el) => (el.textContent = countDone(R.coursera.map((x) => x[0])) + "/" + R.coursera.length));

    $("#stats").innerHTML = [
      ["Overall", overall + "%", `${done} of ${total} tasks`],
      ["Current week", current ? "W" + current.n : "Done", current ? `Phase ${current.phase.num}: ${current.phase.title}` : "All 16 weeks complete"],
      ["Hours logged", fmt(hoursTotal), `of ${TARGET * 16} planned`],
      ["Portfolio", countDone(R.portfolio.map((x) => x[0])) + "/" + R.portfolio.length, "items published"],
    ].map(([l, v, s]) => `<div class="stat"><div class="label">${l}</div><div class="value">${v}</div><div class="sub">${esc(s)}</div></div>`).join("");
    $("#overallBar").style.width = overall + "%";

    $("#phaseBars").innerHTML = R.phases.map((p) => {
      const v = pct(phaseTaskIds(p));
      return `<div class="phase-bar-row"><a href="#${p.id}" style="color:inherit;text-decoration:none">${p.num} · ${esc(p.title)}</a><div class="bar"><i style="width:${v}%;background:var(--${p.id})"></i></div><div class="n">${v}%</div></div>`;
    }).join("");

    const maxH = Math.max(TARGET * 1.5, ...allWeeks.map((w) => Number(state.hours[w.n]) || 0));
    $("#hoursChart").innerHTML = allWeeks.map((w) => {
      const h = Number(state.hours[w.n]) || 0;
      return `<div class="col" title="Week ${w.n}: ${fmt(h)} hrs"><div class="hb ${h < TARGET ? "under" : ""}" style="height:${(h / maxH) * 100}%"></div></div>`;
    }).join("") + `<div class="target" style="bottom:${(TARGET / maxH) * 100}%"><span>${TARGET}h</span></div>`;

    if (current) {
      const next = current.tasks.find((t) => !state.checked[t[0]]);
      $("#nextUp").innerHTML = `<b>Next up · Week ${current.n}:</b> ${esc(next[1])} <a href="#${current.phase.id}">Go →</a>`;
    } else {
      $("#nextUp").innerHTML = `<b>All 16 weeks complete.</b> Pick your deep-dive track in <a href="#next">After 4 months</a>.`;
    }
  }
  const fmt = (n) => (Math.round(n * 10) / 10).toString();

  // ---------- mutations ----------
  function commit() {
    state.updatedAt = Date.now();
    lsSet(LS_STATE, state);
    updateProgress();
    schedulePush();
  }

  document.addEventListener("change", (e) => {
    const el = e.target;
    if (el.matches("input[data-id]")) {
      if (el.checked) state.checked[el.dataset.id] = true; else delete state.checked[el.dataset.id];
      commit();
    }
  });
  let hoursTimer;
  document.addEventListener("input", (e) => {
    const el = e.target;
    if (!el.matches("input[data-hours]")) return;
    let v = parseFloat(el.value);
    if (!isFinite(v) || v <= 0) delete state.hours[el.dataset.hours];
    else state.hours[el.dataset.hours] = Math.min(80, Math.round(v * 2) / 2);
    clearTimeout(hoursTimer);
    hoursTimer = setTimeout(commit, 400);
  });

  // ---------- UI helpers ----------
  function toast(msg) {
    const t = $("#toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("show"), 2800);
  }
  function setSync(kind, label) {
    const s = $("#sync");
    s.querySelector(".dot").className = "dot " + (kind || "");
    s.querySelector(".label").textContent = label;
    s.title = label;
  }

  $("#themeBtn").addEventListener("click", () => {
    const root = document.documentElement;
    const isDark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = isDark ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch {}
  });

  // Highlight active nav link
  const navLinks = $$("#nav a");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
    });
  }, { rootMargin: "-40% 0px -55% 0px" });

  // ---------- Supabase sync ----------
  const configured = !!(CFG.SUPABASE_URL && CFG.SUPABASE_ANON_KEY && window.supabase);
  let sb = null, user = null, pushTimer = null, pushing = false;

  function schedulePush() {
    if (!user) { setSync("", configured ? "Saved on this device · sign in to sync" : "Saved on this device"); return; }
    setSync("busy", "Saving…");
    clearTimeout(pushTimer);
    pushTimer = setTimeout(push, 700);
  }

  async function push() {
    pushTimer = null;
    if (!user || pushing) { if (user) schedulePush(); return; }
    pushing = true;
    const snapshot = { ...state };
    const { error } = await sb.from("progress").upsert({ user_id: user.id, data: snapshot, updated_at: new Date().toISOString() });
    pushing = false;
    if (error) { setSync("err", "Sync failed · will retry"); console.error(error); setTimeout(schedulePush, 5000); return; }
    meta = { userId: user.id, lastSyncedAt: snapshot.updatedAt };
    lsSet(LS_META, meta);
    setSync("ok", "Synced · " + user.email);
  }

  function merge(a, b) {
    const hours = { ...a.hours };
    Object.entries(b.hours).forEach(([k, v]) => { hours[k] = Math.max(Number(hours[k]) || 0, Number(v) || 0); });
    return { checked: { ...a.checked, ...b.checked }, hours, updatedAt: Date.now() };
  }

  async function pull() {
    if (!user || pushing || pushTimer) return;
    setSync("busy", "Syncing…");
    const { data, error } = await sb.from("progress").select("data").eq("user_id", user.id).maybeSingle();
    if (error) { setSync("err", "Sync failed"); console.error(error); return; }

    const firstTimeHere = meta.userId !== user.id;
    if (!data) { // nothing in the cloud yet → upload this device's progress
      await push(); return;
    }
    const remote = normalize(data.data);
    if (firstTimeHere) {
      // First sign-in on this device: combine offline progress with the cloud copy.
      const hasLocal = Object.keys(state.checked).length || Object.keys(state.hours).length;
      state = hasLocal ? merge(remote, state) : remote;
      lsSet(LS_STATE, state); applyState();
      if (hasLocal) { await push(); } else { meta = { userId: user.id, lastSyncedAt: remote.updatedAt }; lsSet(LS_META, meta); setSync("ok", "Synced · " + user.email); }
      return;
    }
    const localDirty = state.updatedAt > meta.lastSyncedAt;
    if (localDirty && state.updatedAt > remote.updatedAt) { await push(); return; }
    state = remote;
    lsSet(LS_STATE, state);
    meta = { userId: user.id, lastSyncedAt: remote.updatedAt };
    lsSet(LS_META, meta);
    applyState();
    setSync("ok", "Synced · " + user.email);
  }

  function updateAuthUI() {
    const btn = $("#authBtn");
    if (!configured) { btn.textContent = "Set up sync"; setSync("", "Saved on this device"); return; }
    btn.textContent = user ? "Sign out" : "Sign in to sync";
    if (!user) setSync("", "Saved on this device · sign in to sync");
  }

  const dlg = $("#authDialog");
  $("#authBtn").addEventListener("click", async () => {
    if (!configured) { toast("Add your Supabase URL and anon key in config.js (see README)."); return; }
    if (user) { await sb.auth.signOut(); toast("Signed out. Progress stays saved on this device."); return; }
    $("#authMsg").textContent = "";
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", "");
    $("#authEmail").focus();
  });
  $("#authCancel").addEventListener("click", () => dlg.close());
  $("#authForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = $("#authEmail").value.trim();
    if (!email) return;
    const sendBtn = $("#authSend"); sendBtn.disabled = true;
    $("#authMsg").textContent = "Sending…";
    const { error } = await sb.auth.signInWithOtp({ email, options: { emailRedirectTo: location.origin + location.pathname } });
    sendBtn.disabled = false;
    $("#authMsg").innerHTML = error
      ? `<span style="color:var(--danger)">${esc(error.message)}</span>`
      : `Check <b>${esc(email)}</b> and open the link on this device.`;
  });

  // ---------- boot ----------
  render();
  $$("main section[id]").forEach((s) => io.observe(s));
  updateAuthUI();

  if (configured) {
    sb = window.supabase.createClient(CFG.SUPABASE_URL, CFG.SUPABASE_ANON_KEY);
    sb.auth.onAuthStateChange((event, session) => {
      const next = session ? session.user : null;
      const changed = (next && next.id) !== (user && user.id);
      user = next;
      updateAuthUI();
      if (user && changed) {
        if (event === "SIGNED_IN") dlg.open && dlg.close();
        setTimeout(pull, 0); // don't await inside the auth callback
      }
    });
    const refresh = () => { if (document.visibilityState === "visible") pull(); };
    document.addEventListener("visibilitychange", refresh);
    window.addEventListener("focus", refresh);
  }
})();
