// All roadmap content lives here. Task "id"s are what gets saved,
// so don't change an id after you start tracking (editing the text is fine).
window.ROADMAP = {
  phases: [
    {
      id: "p1", num: 1, title: "Foundations", weeks: "Weeks 1–4",
      goal: "Get comfortable with Linux, understand how networks work, and set up a safe home lab. Almost every attack and investigation later depends on this.",
      weekList: [
        { n: 1, topics: "Home lab setup, Linux basics: files, permissions, users, processes, package install",
          res: [["VirtualBox","https://www.virtualbox.org/"],["Kali Linux VM image","https://www.kali.org/get-kali/#kali-virtual-machines"],["Linux Journey","https://linuxjourney.com/"]],
          hi: [["Tech Raj (Hinglish basics)","https://www.youtube.com/results?search_query=tech+raj+cyber+security"]],
          tip: "VM feels slow? Use Ubuntu via WSL2 on Windows, or TryHackMe's browser-based AttackBox. Create a Windows restore point before installing lab tools.",
          tasks: [["w1-a","Install VirtualBox and get Kali running (4–6 GB RAM, 60 GB disk) — or WSL2 Ubuntu"],["w1-b","Linux Journey: Getting Started + Command Line sections"],["w1-c","OverTheWire Bandit levels 0–10"]] },
        { n: 2, topics: "Networking 1: IP addresses, subnets, MAC, ports, TCP vs UDP, OSI and TCP/IP models",
          res: [["Professor Messer Network+ videos","https://www.professormesser.com/network-plus/n10-009/n10-009-video/n10-009-training-course/"]],
          hi: [["Gate Smashers – Computer Networks","https://www.youtube.com/results?search_query=gate+smashers+computer+networks"]],
          tasks: [["w2-a","Watch networking basics videos (IP, subnets, ports, OSI)"],["w2-b","OverTheWire Bandit levels 11–20"],["w2-c","Create GitHub repo cybersecurity-learning-log with the folder structure below; push Linux command notes"]] },
        { n: 3, topics: "Networking 2: DNS, HTTP/HTTPS, DHCP, ARP, how a web request travels. Start Python basics",
          res: [["TryHackMe Pre Security path","https://tryhackme.com/path/outline/presecurity"],["CS50P","https://cs50.harvard.edu/python/"],["Wireshark","https://www.wireshark.org/"]],
          hi: [["CodeWithHarry – Python","https://www.youtube.com/results?search_query=codewithharry+python+tutorial+for+beginners"]],
          tasks: [["w3-a","TryHackMe Pre Security free rooms (networking section)"],["w3-b","CS50P weeks 0–2"],["w3-c","Capture your browsing in Wireshark; find DNS, TCP handshake, TLS and HTTP packets"],["w3-d","Python: SHA-256 file hash calculator"],["w3-e","Short report: what happens when I visit a website (DNS → TCP → TLS → request → response)"]] },
        { n: 4, topics: "Security basics: CIA triad, attack types (phishing, malware, DoS, MITM), scanning with Nmap",
          res: [["TryHackMe (free Nmap & Wireshark rooms)","https://tryhackme.com/"],["Nmap book","https://nmap.org/book/"]],
          hi: [["Tech Raj","https://www.youtube.com/results?search_query=tech+raj+cyber+security"]],
          tasks: [["w4-a","Free TryHackMe rooms on Nmap and Wireshark"],["w4-b","Scan your own VMs with Nmap"],["w4-c","Blog post: explain every open port you found"],["w4-d","End-of-phase quiz with Claude (passed)"]] }
      ],
      check: "What happens when you type google.com into a browser? TCP vs UDP? What do ports 22, 53, 80 and 443 do? How do Linux file permissions work?",
      note: "<b>Lab safety:</b> only scan and attack machines you own or platforms that give permission (TryHackMe, HackTheBox, PortSwigger). Never scan the BITS campus network."
    },
    {
      id: "p2", num: 2, title: "Python + Web Hacking", weeks: "Weeks 5–8",
      goal: "Learn how websites break. Web security is the most beginner-friendly offensive skill and what most internships and bug bounty programs test. Main teacher: PortSwigger's free Web Security Academy.",
      weekList: [
        { n: 5, topics: "How web apps work: HTTP requests/responses, cookies, sessions. Burp Suite basics. Python: lists, functions, files",
          res: [["Burp Suite Community","https://portswigger.net/burp/communitydownload"],["Web Security Academy","https://portswigger.net/web-security"],["CS50P","https://cs50.harvard.edu/python/"]],
          hi: [["TechChip – Burp Suite","https://www.youtube.com/results?search_query=techchip+kali+linux+burp+suite"]],
          tasks: [["w5-a","Intercept and change a request in Burp Suite"],["w5-b","CS50P weeks 3–4"],["w5-c","Python: wordlist reader, log-filter script and IP-address extractor"]] },
        { n: 6, topics: "SQL injection, authentication flaws. Basic SQL",
          res: [["Web Security Academy – SQL injection","https://portswigger.net/web-security/sql-injection"],["Web Security Academy – Authentication","https://portswigger.net/web-security/authentication"]],
          hi: [["Bitten Tech – SQL injection","https://www.youtube.com/results?search_query=bitten+tech+sql+injection"]],
          tasks: [["w6-a","Solve 5+ Apprentice labs (SQLi + authentication)"],["w6-b","Write notes for each lab in GitHub"]] },
        { n: 7, topics: "Cross-site scripting (XSS), access control / IDOR, path traversal",
          res: [["Web Security Academy – XSS","https://portswigger.net/web-security/cross-site-scripting"],["OWASP Juice Shop","https://owasp.org/www-project-juice-shop/"]],
          hi: [["Bitten Tech","https://www.youtube.com/results?search_query=bitten+tech+ethical+hacking"]],
          tasks: [["w7-a","XSS, access control and path traversal Apprentice labs"],["w7-b","Install OWASP Juice Shop locally"],["w7-c","Find 10 bugs in Juice Shop"]] },
        { n: 8, topics: "OWASP Top 10, command injection, file upload bugs. Python: sockets and requests",
          res: [["OWASP Top 10","https://owasp.org/Top10/"],["DVWA","https://github.com/digininja/DVWA"]],
          hi: [["Cyberwings Security","https://www.youtube.com/results?search_query=cyberwings+security"]],
          tasks: [["w8-a","Remaining Apprentice labs + DVWA practice"],["w8-b","Project 1: Python port scanner + directory brute-forcer on GitHub with README"],["w8-c","Security review of your own vibe-coded app: inputs, auth, stored data, endpoints, exposed API keys (write it up, no secrets)"],["w8-e","Try 1 lab each: CSRF, SSRF, file upload, API testing"],["w8-d","End-of-phase quiz with Claude (passed)"]] }
      ],
      check: "Explain SQL injection and XSS to a non-technical friend, and show how you'd fix each in code.",
      note: "<b>Use your vibe-coded web apps:</b> run one locally and test it for SQL injection, XSS and broken access control. \"I hacked my own app and fixed it\" is a strong, honest portfolio piece."
    },
    {
      id: "p3", num: 3, title: "OSINT + Forensics", weeks: "Weeks 9–12",
      goal: "Learn to investigate after an attack — closest to Amit Dubey's work: tracing fraudsters, analyzing seized devices, helping law enforcement.",
      weekList: [
        { n: 9, topics: "OSINT: username/email tracing, reverse image search, WHOIS, social media footprints, ethics of OSINT",
          res: [["OSINT Framework","https://osintframework.com/"],["Sherlock","https://github.com/sherlock-project/sherlock"]],
          hi: [["Tech Raj","https://www.youtube.com/results?search_query=tech+raj+osint"]],
          tasks: [["w9-a","Free TryHackMe OSINT rooms"],["w9-b","OSINT report on yourself, then clean up your public data"]] },
        { n: 10, topics: "Fraud investigation: phishing email headers, fake UPI/KYC/\"digital arrest\" scams, scam domains, how victims report",
          res: [["National Cyber Crime Reporting Portal","https://cybercrime.gov.in/"],["MXToolbox header analyzer","https://mxtoolbox.com/EmailHeaders.aspx"],["URLScan.io","https://urlscan.io/"]],
          hi: [["Tech Raj – scams","https://www.youtube.com/results?search_query=tech+raj+online+fraud"]],
          tasks: [["w10-a","Analyze a real phishing email header"],["w10-b","Project 2: mock investigation report on a real scam SMS/email"]] },
        { n: 11, topics: "Disk forensics: chain of custody, imaging, hashing, file recovery, browser history, Windows artifacts",
          res: [["Autopsy","https://www.autopsy.com/"],["CyberDefenders","https://cyberdefenders.org/"]],
          hi: [["WsCube Tech – forensics","https://www.youtube.com/results?search_query=wscube+tech+digital+forensics+hindi"]],
          tasks: [["w11-a","Install Autopsy + FTK Imager"],["w11-b","Analyze a practice disk image and write a suspect timeline"]] },
        { n: 12, topics: "Memory and log forensics: processes, network connections, Windows event logs. Intro to malware behavior",
          res: [["Volatility 3","https://github.com/volatilityfoundation/volatility3"],["Blue Team Labs Online","https://blueteamlabs.online/"]],
          hi: [["Cyberwings Security","https://www.youtube.com/results?search_query=cyberwings+security"]],
          tasks: [["w12-a","Solve 2 memory forensics challenges"],["w12-b","Publish both write-ups"],["w12-d","Mini defensive project: analyze a PCAP or log file, extract indicators, build a timeline, state confidence"],["w12-c","End-of-phase quiz with Claude (passed)"]] }
      ],
      check: "What is chain of custody and why do courts care? How would you prove a file wasn't changed after seizure? (Hint: hashing.)",
      note: "<b>Why this pairing works:</b> knowing how attackers break in makes you a much better investigator — and investigators who think like attackers are rare in India."
    },
    {
      id: "p4", num: 4, title: "CTFs + Portfolio", weeks: "Weeks 13–16",
      goal: "Combine everything and create proof that you can do the work. Recruiters trust write-ups and reports far more than course certificates.",
      weekList: [
        { n: 13, topics: "Beginner CTFs: web, forensics, OSINT, basic crypto",
          res: [["picoCTF","https://picoctf.org/"],["CTFtime","https://ctftime.org/"]],
          hi: [["Bitten Tech – CTF","https://www.youtube.com/results?search_query=bitten+tech+ctf"]],
          tasks: [["w13-a","Solve 15 picoCTF challenges across categories"],["w13-b","Join one live online CTF with BITS friends"]] },
        { n: 14, topics: "First full machine: recon → exploit → privilege escalation",
          res: [["HTB Academy","https://academy.hackthebox.com/"],["TryHackMe","https://tryhackme.com/"]],
          hi: [["Cyberwings Security","https://www.youtube.com/results?search_query=cyberwings+security+walkthrough"]],
          tasks: [["w14-a","Complete easy boot-to-root machine #1"],["w14-b","Complete easy boot-to-root machine #2"]] },
        { n: 15, topics: "Project 3: a professional pentest report",
          res: [["DVWA","https://github.com/digininja/DVWA"],["OWASP Juice Shop","https://owasp.org/www-project-juice-shop/"]],
          hi: [],
          tasks: [["w15-a","Write a 5–8 page pentest report (summary, scope, findings, screenshots, fixes)"],["w15-b","Publish the PDF on GitHub"]] },
        { n: 16, topics: "Portfolio polish and review",
          res: [["GitHub Pages","https://pages.github.com/"]],
          hi: [],
          tasks: [["w16-a","Clean README on your GitHub repo"],["w16-b","8–10 blog posts published"],["w16-c","Resume draft with 3 projects, reviewed by Claude"],["w16-d","LinkedIn updated"]] }
      ],
      check: "Explain one CTF challenge you solved step by step, and walk through your pentest report's top finding.",
      note: "<b>Write-up rule:</b> don't publish solutions for active HackTheBox machines or live CTFs. Retired machines, picoCTF practice and your own lab are fine."
    }
  ],

  outcomes: [
    "Use Linux comfortably from the terminal",
    "Explain IP, ports, DNS, HTTP/TLS, TCP/UDP and basic routing",
    "Write small Python scripts for security tasks",
    "Find and explain SQLi, XSS, auth flaws, IDOR and path traversal in labs",
    "Use Nmap, Burp Suite and Wireshark in authorised labs",
    "Run an OSINT and phishing/scam investigation",
    "Explain evidence handling and build a forensic timeline",
    "Write professional lab and pentest reports",
    "Choose your next specialization with confidence"
  ],

  repoTree: "cybersecurity-learning-log/\n├── linux/\n├── networking/\n├── python/\n├── web-security/\n├── osint/\n├── forensics/\n├── ctf/\n├── reports/\n└── scripts/",

  writeup: ["Title and date","Authorisation and scope (which lab / platform)","Objective","Tools used","Method (steps)","Observations","Finding or conclusion","Evidence (screenshots, secrets removed)","Impact","Remediation / fix","What I misunderstood at first","Lessons learned"],

  reflection: ["What did I learn?","What can I demonstrate?","What mistake did I make?","What evidence did I produce?","What will I practise next week?"],

  portfolio: [
    ["pf-1","Home lab setup post"],["pf-2","OverTheWire Bandit write-ups"],["pf-3","Python port scanner + directory brute-forcer (GitHub)"],
    ["pf-4","PortSwigger lab notes (15+ labs)"],["pf-5","\"I hacked my own web app\" post"],["pf-6","Scam/fraud investigation report"],
    ["pf-7","Forensics write-ups (disk + memory)"],["pf-8","picoCTF write-ups"],["pf-9","Professional pentest report (PDF)"]
  ],

  coursera: [
    ["cs-g1","Google: Foundations of Cybersecurity","Weeks 1–8","https://www.coursera.org/professional-certificates/google-cybersecurity"],
    ["cs-g3","Google: Connect and Protect: Networks and Network Security","Weeks 1–8","https://www.coursera.org/professional-certificates/google-cybersecurity"],
    ["cs-g4","Google: Tools of the Trade: Linux and SQL","Weeks 1–8","https://www.coursera.org/professional-certificates/google-cybersecurity"],
    ["cs-if","Infosec: Computer Forensics Specialization","Weeks 9–12","https://www.coursera.org/specializations/computerforensics"],
    ["cs-py","UMich: Python for Everybody (optional, instead of CS50P)","Weeks 1–8","https://www.coursera.org/specializations/python"],
    ["cs-grest","Google certificate: remaining 6 courses","After Week 16","https://www.coursera.org/professional-certificates/google-cybersecurity"],
    ["cs-ibm","IBM Cybersecurity Analyst Professional Certificate","After Week 16","https://www.coursera.org/professional-certificates/ibm-cybersecurity-analyst"]
  ]
};
