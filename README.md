# Tim Williams Consulting Ltd  
SC‑Cleared Senior IT Programme Manager  
Cyber Security • Cloud Transformation • Digital Workplace • Enterprise Infrastructure

I lead large‑scale cyber security, cloud, and enterprise transformation programmes across NHS England, Defence, and global organisations.  
This site contains my portfolio, case studies, certifications, and consulting offerings.

---

## 📚 Table of Contents
1. [Website](#-website)  
2. [Key Pages](#-key-pages-for-reference)  
3. [About](#about)  
4. [Website Feedback Survey](#-website-feedback-survey-surveyhtml)  
5. [Site Architecture Diagram](#-site-architecture-diagram)

---

## 🌐 Website  
https://www.twc-ltd.uk

---

## 🔧 Key Pages (for reference)

### 🏠 Homepage  
https://www.twc-ltd.uk/index.html

### 🧩 Offerings  
https://www.twc-ltd.uk/new.html

### 🏛️ Brand Story (TWC Ltd)  
https://www.twc-ltd.uk/twc-ltd.html

### 📁 Portfolio  
https://www.twc-ltd.uk/portfolio.html

### 🎓 Certifications  
https://www.twc-ltd.uk/certifications.html

### 📝 Insights  
https://www.twc-ltd.uk/insights.html

### 📞 Contact  
https://www.twc-ltd.uk/contact.html

---

## About  
Tim Williams — Senior IT Programme Manager delivering secure, high‑risk, enterprise‑scale transformation programmes across cyber, cloud, and digital workplace environments.

---

## 📝 Website Feedback Survey (`survey.html`)

The Website Feedback Survey page collects structured visitor feedback to support continuous improvement of the TWC website. It includes required and optional questions covering first impressions, navigation, service clarity, trust signals, and contact preferences.

### 🔍 Purpose
To gather real user insights and identify opportunities to refine the website’s content, structure, and user experience.

### 🧩 Key Features
• Multi‑section form with required and optional fields  
• Inline success confirmation (no page reload)  
• Spam‑prevention honeypot field  
• Fully responsive layout (mobile, tablet, desktop)  
• Branded CTA graphic displayed above the form  
• iPad‑specific alignment logic for professional layout  
• Integrated analytics tracking (Plausible + local event logging)

### 🔗 Where It’s Linked
• Footer → Website Feedback  
• Contact page → link below the contact form  
• Sites page → added to the floating category index  
• Direct URL → `/survey.html`

### 🛠 Technical Notes
• Submissions handled by UseBasin  
• Async JavaScript handles form submission + success state  
• Uses global header/footer injection for consistent layout  
• Styled using the TWC global CSS framework

---

## 🗺 Site Architecture Diagram

```
twc-ltd.uk
│
├── index.html                (Homepage)
├── twc-ltd.html              (Brand Story)
├── new.html                  (Offerings / Services)
├── portfolio.html            (Portfolio & Case Studies)
├── certifications.html       (Certifications & Learning)
├── insights.html             (Insights & Articles)
├── contact.html              (Contact Form)
│     └── links to survey.html
│
├── sites.html                (Professional Profiles & Links)
│     └── floating menu includes survey.html
│
├── survey.html               (Website Feedback Survey)
│     ├── CTA graphic
│     ├── Multi‑section form
│     └── UseBasin submission handler
│
├── header.html               (Injected globally)
├── footer.html               (Injected globally, includes survey link)
│
├── header-standard-v4.css    (Global header styling)
├── global-restore.css        (Global layout & resets)
├── certifications.css        (Shared styling)
│
└── assets/                   (Images, icons, graphics)
```

---

