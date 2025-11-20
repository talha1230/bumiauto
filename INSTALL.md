# Installation Commands

## After installing Node.js, run these commands:

```powershell
# Navigate to project
cd c:\Users\user\bumiauto

# Install all dependencies from package.json
npm install

# Install additional dependencies for BumiAuto
npm install react-hook-form @hookform/resolvers zod resend

# Start development server
npm run dev
```

## Verify Installation

```powershell
# Check Node.js version (should be 18+)
node --version

# Check npm version
npm --version

# List installed packages
npm list --depth=0
```

## Expected Dependencies

After installation, you should have:
- ✅ Next.js 15.3.1
- ✅ React 19
- ✅ @once-ui-system/core (design system)
- ✅ react-hook-form (form handling)
- ✅ zod (validation)
- ✅ resend (email service)
- ✅ TypeScript
- ✅ MDX support

## Troubleshooting

**If npm command not found:**
- Install Node.js from https://nodejs.org/
- Restart PowerShell after installation

**If installation fails:**
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` folder and `package-lock.json`
- Run `npm install` again

**If port 3000 is already in use:**
- Kill the process: `Stop-Process -Name node -Force`
- Or use different port: `npm run dev -- -p 3001`
