# Phone Authentication Setup Guide

## ✅ What's Been Implemented

Your application now has **2-factor phone verification** during signup:

1. **Step 1:** User enters email, password, full name, and phone number
2. **Step 2:** 4-digit OTP code sent to phone via SMS
3. **Step 3:** User enters code to verify phone and complete registration
4. **Auto-submit:** Code auto-submits when all 4 digits entered
5. **Resend:** Users can resend code after 60-second timer

## 🔧 Configuration Required

To enable SMS delivery, you need to configure a phone auth provider in your backend.

### Option 1: Twilio (Recommended)

Supabase uses Twilio for SMS delivery by default.

**Steps:**

1. Create a Twilio account at https://www.twilio.com/try-twilio
2. Get your Twilio credentials:
   - Account SID
   - Auth Token
   - Twilio Phone Number

3. Configure in your backend:

<lov-actions>
<lov-open-backend>Open Backend Dashboard</lov-open-backend>
</lov-actions>

4. Navigate to: **Authentication → Phone Auth Settings**

5. Enter your Twilio credentials:
   ```
   Twilio Account SID: [Your SID]
   Twilio Auth Token: [Your Token]  
   Twilio Phone Number: [Your number]
   ```

6. Enable Phone Authentication

### Option 2: Vonage / MessageBird / Textlocal

Supabase also supports other SMS providers. Configure similarly in the backend dashboard.

## 📱 Phone Number Format

Users should enter phone numbers in **international E.164 format**:

- ✅ Correct: `+14155552671` (US)
- ✅ Correct: `+442071838750` (UK)
- ✅ Correct: `+919876543210` (India)
- ❌ Wrong: `415-555-2671`
- ❌ Wrong: `(415) 555-2671`

The form validation requires:
- Minimum 10 digits
- Maximum 20 characters
- Should include country code with `+` prefix

## 🧪 Testing Phone Auth

### Development Mode

For testing without SMS costs:

1. In your backend, go to **Authentication → Phone Auth**
2. Add test phone numbers (e.g., `+14155552671`)
3. Set a fixed OTP code for testing (e.g., `1234`)
4. These test numbers will bypass SMS sending

### Production Mode

1. Ensure you have sufficient Twilio credits
2. Test with a real phone number
3. Monitor SMS delivery in Twilio console
4. Set up rate limiting to prevent abuse

## 🔒 Security Features

**Already Implemented:**

- ✅ 4-digit OTP codes
- ✅ 60-second resend timer (prevents spam)
- ✅ Client-side validation (phone format)
- ✅ Input sanitization (digits only)
- ✅ Auto-submit on complete code entry
- ✅ Proper error handling

**Recommended Additional Security:**

- Rate limiting on OTP requests (configure in backend)
- Max 3-5 attempts before lockout
- OTP expiration (default: 60 seconds)
- Phone number uniqueness validation

## 📝 User Flow

```
1. User clicks "Sign Up"
   ↓
2. Enters: Email, Password, Name, Phone (+14155552671)
   ↓
3. Form validates inputs
   ↓
4. System sends 4-digit OTP via SMS
   ↓
5. User sees phone verification screen
   ↓
6. User enters 4-digit code (auto-submits when complete)
   ↓
7. System verifies OTP
   ↓
8. If valid: Creates account + redirects to dashboard
9. If invalid: Shows error + allows retry
```

## 🎨 UI Components

**Components Created:**

1. `PhoneVerification.tsx` - 4-digit OTP input screen with:
   - Auto-focus on first digit
   - Auto-advance to next digit
   - Backspace navigation
   - Paste support (for codes from SMS)
   - Countdown timer
   - Resend button
   - Error display

2. Updated `Auth.tsx` - Two-step signup:
   - Step 1: Collect user info + phone
   - Step 2: Verify phone with OTP

3. Updated `useAuth.tsx` - New functions:
   - `sendPhoneOTP()` - Sends SMS code
   - `verifyPhoneOTP()` - Verifies code + creates account

## ⚠️ Important Notes

### Phone Number Storage

Phone numbers are stored in:
- User metadata: `user.user_metadata.phone_number`
- Profiles table: `profiles.phone_number`

### SMS Costs

- Twilio charges per SMS sent
- International SMS costs vary by country
- Set up billing alerts in Twilio
- Consider rate limiting to control costs

### Compliance

**You must comply with:**
- TCPA (US) - Telephone Consumer Protection Act
- GDPR (EU) - Phone numbers are personal data
- Local telecommunications regulations
- Obtain consent before sending SMS

**Add to your Privacy Policy:**
- How phone numbers are used
- SMS opt-out instructions
- Data retention policy

## 🐛 Troubleshooting

### "Failed to send verification code"

**Possible causes:**
1. Twilio not configured in backend
2. Invalid phone number format
3. Insufficient Twilio credits
4. Phone number blocked/invalid

**Solutions:**
- Check backend Phone Auth configuration
- Verify phone format includes country code (+)
- Check Twilio account balance
- Try with test phone number first

### "Invalid verification code"

**Possible causes:**
1. Code expired (60-second timeout)
2. Wrong code entered
3. Code already used
4. Network delay

**Solutions:**
- Request new code (resend)
- Check SMS for correct code
- Ensure good network connection

### Phone verification bypassed

During development, if you want to bypass phone verification temporarily:

1. Comment out phone verification step in `Auth.tsx`
2. Use direct `signUp()` instead of OTP flow
3. **Remember to re-enable before production!**

## 📊 Monitoring

**Monitor these metrics:**

1. **SMS Delivery Rate** - Twilio console
2. **OTP Success Rate** - Track verifications vs sends
3. **Failed Attempts** - Security monitoring
4. **SMS Costs** - Twilio billing dashboard

## 🚀 Going Live Checklist

Before enabling in production:

- [ ] Twilio account configured and funded
- [ ] Test with multiple real phone numbers
- [ ] Rate limiting enabled (max 3 SMS/phone/hour)
- [ ] Privacy policy updated with phone/SMS terms
- [ ] Error handling tested thoroughly
- [ ] SMS costs budgeted and monitored
- [ ] Compliance with local regulations verified
- [ ] Customer support process for SMS issues
- [ ] Remove any test phone numbers
- [ ] Monitor SMS delivery rates

## 💡 Alternative Approaches

If SMS costs are a concern, consider:

1. **Email-only verification** - No SMS costs
2. **Optional phone verification** - Make it optional
3. **Phone verification for high-risk actions only** - Not signup
4. **WhatsApp Business API** - Often cheaper than SMS
5. **Voice OTP** - Call with code instead of SMS

---

**Current Implementation Status:**
- ✅ UI Components Built
- ✅ Auth Flow Complete
- ✅ Input Validation Added
- ✅ Error Handling Implemented
- ⚠️ **Backend SMS Provider Configuration Required**

**Next Steps:**
1. Configure Twilio in backend dashboard
2. Test with a real phone number
3. Adjust rate limits as needed
4. Update privacy policy

Need help? Check the backend documentation or contact support.