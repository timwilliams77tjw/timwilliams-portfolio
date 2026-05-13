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
4. [Tech Stack](#-tech-stack)  
5. [Website Feedback Survey](#-website-feedback-survey-surveyhtml)  
6. [Site Architecture Diagram](#-site-architecture-diagram)  
7. [Changelog](#-changelog)  
8. [Roadmap](#-roadmap)

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

## 🧰 Tech Stack

### **Frontend**
- HTML5  
- CSS3 (custom modular architecture)  
- Responsive design (mobile, tablet, desktop)  
- Custom components (header, footer, sticky bars, floating buttons)  

### **JavaScript**
- Vanilla JS (no frameworks)  
- Async form submission  
- Local analytics event logging  
- Dynamic header/footer injection  
- Mobile menu + search enhancements  

### **Forms & Integrations**
- **UseBasin** — secure form submission  
- **Formspree** — contact form handling  
- **Plausible Analytics** — privacy‑friendly tracking  
- Custom analytics tracker (localStorage event logging)

### **Hosting**
- GitHub Pages  
- Custom domain: `twc-ltd.uk`  
- HTTPS enforced  

### **Design System**
- TWC global CSS framework  
- Brand‑aligned colour palette  
- Reusable card, grid, and layout components  

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

## 📝 Changelog

### **2026‑05‑13**
- Added Website Feedback Survey (`survey.html`)  
- Added CTA graphic and responsive alignment logic  
- Added survey link to footer, contact page, and sites page  
- Updated README with TOC, architecture diagram, tech stack, changelog, and roadmap  

### **2026‑05‑10**
- Added new header architecture (v4)  
- Updated portfolio layout and card structure  
- Added global search enhancements  

### **2026‑05‑05**
- Implemented analytics tracker  
- Added UseBasin integration for survey form  
- Improved mobile responsiveness across all pages  

---

## 🧭 Roadmap

### **Planned Enhancements**
- Add dark‑mode support for survey page  
- Add success redirect page (`success.html`)  
- Add micro‑interactions (fade‑ins, scroll reveals)  
- Expand Insights section with new articles  
- Add downloadable PDF portfolio  
- Add structured data (schema.org) for SEO  
- Add automated sitemap generation  

### **Future Considerations**
- Migrate forms to a unified backend service  
- Add optional authentication for private case studies  
- Introduce a lightweight CMS for Insights  
- Add A/B testing for CTA graphics and messaging  

---

