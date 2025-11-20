# BumiAuto Project Setup - Next Steps

## ✅ Completed

1. **Environment Setup**
   - Created `.env.local` with dummy API keys for Resend, Mailgun, and Appwrite
   - All necessary environment variables configured

2. **Content Structure**
   - Updated `src/resources/content.tsx` with BumiAuto branding
   - Changed from portfolio to fintech/corporate structure
   - Updated home, about, services sections
   - Modified social links (LinkedIn, Facebook, WhatsApp, Email)

3. **Form Components**
   - ✅ `src/components/forms/LoanInquiryForm.tsx` - Full loan application form
   - ✅ `src/components/forms/ContactForm.tsx` - General contact form
   - Both with validation, error handling, and loading states

4. **WhatsApp Integration**
   - ✅ `src/components/WhatsAppButton.tsx` - Floating WhatsApp button
   - Appears after scrolling 300px
   - Pre-filled message ready

5. **API Routes**
   - ✅ `src/app/api/loan-inquiry/route.ts` - Handles loan applications
   - ✅ `src/app/api/contact/route.ts` - Handles contact form
   - Both send emails via Resend API

6. **Contact Page**
   - ✅ `src/app/contact/page.tsx` - Complete contact page with form

7. **Component Exports**
   - Updated `src/components/index.ts` to export new components

---

## 🔧 Required: Install Node.js & Dependencies

**Before proceeding, you must install Node.js:**

1. Download Node.js v18 or higher from: https://nodejs.org/
2. After installation, run in PowerShell:

```powershell
node --version
npm --version
```

3. Then install project dependencies:

```powershell
cd c:\Users\user\bumiauto
npm install
```

4. Install the additional dependencies we need:

```powershell
npm install react-hook-form @hookform/resolvers zod resend
```

---

## 📋 Next Steps (After Node.js Installation)

### Phase 1: Setup Services Page

The current `/work` path needs to become `/services`:

1. **Rename route folder:**
   ```powershell
   Move-Item "src\app\work" "src\app\services"
   ```

2. **Update services page** (`src/app/services/page.tsx`):
   - Change from portfolio projects to service offerings
   - Showcase: Motorcycle Loans, Consumer Durables, Flexible Plans

3. **Create service detail pages** in `src/app/services/projects/`:
   - `motorcycle-microloans.mdx`
   - `consumer-durable-financing.mdx`
   - `flexible-repayment-plans.mdx`

### Phase 2: Update Home Page

**File:** `src/app/page.tsx`

Changes needed:
- Replace portfolio hero with BumiAuto hero
- Add loan inquiry CTA buttons
- Feature services overview
- Add "Why Choose Us" section
- Include WhatsApp button
- Remove blog preview (or keep as "Resources")

### Phase 3: Update Layout & Navigation

**File:** `src/app/layout.tsx`

- Add WhatsApp floating button globally
- Update metadata for SEO

**File:** `src/components/Header.tsx`

Update navigation links:
- Home → /
- About → /about
- Services → /services (was /work)
- Resources → /blog (optional)
- Contact → /contact
- Add "Apply Now" CTA button

### Phase 4: Update Footer

**File:** `src/components/Footer.tsx`

Update with:
- Company info
- Quick links (Services, About, Contact)
- Legal links (Terms, Privacy - create pages)
- Social media icons
- Newsletter signup (already has Mailchimp)

### Phase 5: About Page Updates

**File:** `src/app/about/page.tsx`

Content is already updated in `content.tsx`, but page layout may need tweaking:
- Mission statement
- Core services
- Why choose us
- How it works
- Remove calendar booking (already disabled)

### Phase 6: Content & Images

1. **Add company logo:**
   - Replace `public/images/avatar.jpg` with BumiAuto logo
   - Update favicon

2. **Add service images:**
   - `public/images/services/motorcycle.jpg`
   - `public/images/services/consumer-durable.jpg`
   - `public/images/hero-bg.jpg`

3. **Create blog posts** (optional, in `src/app/blog/posts/`):
   - `understanding-microloans.mdx`
   - `motorcycle-financing-guide.mdx`
   - `tips-for-loan-approval.mdx`

### Phase 7: SEO & Meta Tags

Update in `src/app/layout.tsx`:
- Site title: "BumiAuto - Motorcycle Microloans Malaysia"
- Description
- Keywords
- Open Graph images

Create `public/images/og/` images:
- `home.jpg` (1200x630)
- `about.jpg`
- `services.jpg`
- `contact.jpg`

### Phase 8: Email Service Configuration

**Choose ONE:**

**Option A: Resend (Recommended)**
1. Sign up at https://resend.com
2. Get API key
3. Update `.env.local` with real `RESEND_API_KEY`
4. Verify domain (bumiauto.com.my)

**Option B: Mailgun**
1. Sign up at https://mailgun.com
2. Get API key and domain
3. Update `.env.local`
4. Modify API routes to use Mailgun SDK

### Phase 9: Testing

```powershell
# Run dev server
npm run dev

# Open browser to http://localhost:3000
```

Test:
- [ ] All pages load correctly
- [ ] Forms submit successfully
- [ ] WhatsApp button works
- [ ] Navigation works
- [ ] Mobile responsive
- [ ] Email notifications arrive

### Phase 10: Deployment

1. **Push to GitHub:**
   ```powershell
   git add .
   git commit -m "BumiAuto fintech website complete"
   git push origin main
   ```

2. **Deploy to Vercel:**
   - Go to https://vercel.com
   - Import GitHub repository
   - Add environment variables from `.env.local`
   - Deploy

3. **Configure Domain:**
   - Add `bumiauto.com.my` to Vercel
   - Update DNS records

---

## 🎨 Design Customization

### Update Brand Colors

**File:** `src/resources/once-ui.config.ts`

Change color palette to match BumiAuto branding:
- Primary: Blue/Teal for fintech trust
- Secondary: Green for success/growth
- Neutral: Professional grays

### Update Typography

Same file - adjust font sizes and weights if needed.

---

## 📁 Project Structure Overview

```
bumiauto/
├── .env.local                          ✅ Created
├── src/
│   ├── app/
│   │   ├── page.tsx                    🔄 Needs update (Home)
│   │   ├── layout.tsx                  🔄 Add WhatsApp button
│   │   ├── about/page.tsx              ✅ Content ready
│   │   ├── contact/page.tsx            ✅ Created
│   │   ├── services/                   📁 Rename from /work
│   │   │   ├── page.tsx                🔄 Update content
│   │   │   └── projects/               🔄 Create .mdx files
│   │   ├── blog/                       ✅ Keep or remove
│   │   └── api/
│   │       ├── loan-inquiry/route.ts   ✅ Created
│   │       └── contact/route.ts        ✅ Created
│   │
│   ├── components/
│   │   ├── forms/
│   │   │   ├── LoanInquiryForm.tsx     ✅ Created
│   │   │   └── ContactForm.tsx         ✅ Created
│   │   ├── WhatsAppButton.tsx          ✅ Created
│   │   ├── Header.tsx                  🔄 Update nav
│   │   ├── Footer.tsx                  🔄 Update content
│   │   └── index.ts                    ✅ Updated
│   │
│   └── resources/
│       └── content.tsx                 ✅ Updated
│
└── public/
    └── images/                         🔄 Add BumiAuto images
```

---

## 🚀 Quick Start Commands

Once Node.js is installed:

```powershell
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## 📝 Content Guidelines

When writing content:
- Keep language professional but approachable
- Emphasize trust, speed, and flexibility
- Use Malaysian English/Malay where appropriate
- Highlight regulatory compliance
- Clear call-to-actions throughout

---

## 🔐 Security Notes

- Never commit `.env.local` to GitHub (already in `.gitignore`)
- Use environment variables in Vercel dashboard
- Validate all form inputs server-side
- Implement rate limiting on API routes (future enhancement)
- Add CAPTCHA if spam becomes an issue

---

## 📞 Support

For questions or issues during setup:
1. Check console errors in browser (F12)
2. Review terminal output
3. Verify all dependencies installed
4. Ensure `.env.local` variables are set

---

**Ready to continue once Node.js is installed!** 🚀
