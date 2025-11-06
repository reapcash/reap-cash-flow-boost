import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Phone, AlertCircle, CheckCircle2 } from 'lucide-react';

interface PhoneVerificationProps {
  phoneNumber: string;
  onVerified: (code: string) => void;
  onResend: () => void;
  loading: boolean;
  error?: string;
}

export default function PhoneVerification({ 
  phoneNumber, 
  onVerified, 
  onResend, 
  loading,
  error 
}: PhoneVerificationProps) {
  const [code, setCode] = useState(['', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (value && !/^\d+$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }

    // Auto-submit when all 4 digits are entered
    if (newCode.every(digit => digit !== '') && newCode.join('').length === 4) {
      onVerified(newCode.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 4);
    if (!/^\d+$/.test(pastedData)) return;

    const newCode = pastedData.split('').concat(['', '', '', '']).slice(0, 4);
    setCode(newCode);

    if (newCode.every(digit => digit !== '')) {
      onVerified(newCode.join(''));
    }
  };

  const handleResend = () => {
    setCode(['', '', '', '']);
    setTimeLeft(60);
    setCanResend(false);
    onResend();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Phone className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Verify Your Phone Number</h3>
        <p className="text-muted-foreground">
          We've sent a 4-digit code to
        </p>
        <p className="font-medium mt-1">{phoneNumber}</p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div>
        <Label className="text-center block mb-3">Enter Verification Code</Label>
        <div className="flex gap-3 justify-center" onPaste={handlePaste}>
          {code.map((digit, index) => (
            <Input
              key={index}
              id={`code-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-14 h-14 text-center text-2xl font-bold"
              disabled={loading}
              autoFocus={index === 0}
            />
          ))}
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Verifying code...
        </div>
      )}

      <div className="text-center space-y-2">
        {!canResend ? (
          <p className="text-sm text-muted-foreground">
            Resend code in {timeLeft}s
          </p>
        ) : (
          <Button 
            variant="link" 
            onClick={handleResend}
            disabled={loading}
            className="text-primary"
          >
            Resend verification code
          </Button>
        )}
      </div>

      <Alert>
        <CheckCircle2 className="h-4 w-4" />
        <AlertDescription className="text-xs">
          <strong>Note:</strong> Phone verification requires SMS configuration in your backend. 
          If you haven't set this up yet, the code won't be sent.
        </AlertDescription>
      </Alert>
    </div>
  );
}