import React, { useState } from 'react';

// A.I.C.E. Protocol - Unified Branding Constants
const colors = {
  deepViolet: '#1A0B2E',
  phoenixAzure: '#00FFFF',
  starkWhite: '#FFFFFF',
  interfaceGrey: '#DEDEDE',
  warningCrimson: '#FF4500',
};

// High-Readability Font Stack (Gemini Style)
const readableFont = '"Google Sans", "Inter", "Segoe UI", Roboto, Arial, sans-serif';

const ContactUsPage = () => {
  // 🐦‍🔥 Live Memory Binding for all inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [role, setRole] = useState('');
  const [systemClass, setSystemClass] = useState('');
  const [telemetryKey, setTelemetryKey] = useState('');
  const [subject, setSubject] = useState('');
  const [diagnostics, setDiagnostics] = useState('');
  
  // Tactical UI States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);

  const handleIntakeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("TRANSMITTING DEVIANCE PACKET...");

    // 🐦‍🔥 THE WEB3FORMS API PAYLOAD
    const payload = {
      access_key: "3920a8a0-06ad-47f2-a6f7-f9bae987b7c0",
      subject: `A.I.C.E. TRIAGE: ${subject} [${systemClass || 'Unclassified'}]`,
      from_name: name,
      Operator_Name: name,
      Email: email,
      Phone: phone,
      Organization: organization,
      Role: role,
      System_Class: systemClass || 'Unclassified',
      Telemetry_Key: telemetryKey || 'None Provided',
      Issue_Type: subject,
      Message_Log: diagnostics,
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      
      const result = await response.json();
      if (result.success) {
        setSubmitStatus("TRANSMISSION SECURED. A.I.C.E. WILL REVIEW.");
        // Purge form data on success
        setName(''); setEmail(''); setPhone(''); setOrganization(''); setRole('');
        setSystemClass(''); setTelemetryKey(''); setSubject(''); setDiagnostics('');
      } else {
        setSubmitStatus("TRANSMISSION FAILED. CHECK API CONNECTION.");
      }
    } catch (error) {
      setSubmitStatus("CRITICAL ERROR: UPLINK SEVERED.");
    }
    
    setIsSubmitting(false);
  };

  return (
    <div style={{
      fontFamily: readableFont,
      backgroundColor: colors.deepViolet,
      color: colors.starkWhite,
      minHeight: '100vh',
      padding: '40px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      {/* HEADER NODE */}
      <header style={{
        textAlign: 'center',
        marginBottom: '60px',
        borderBottom: `2px solid ${colors.phoenixAzure}`,
        paddingBottom: '20px',
        width: '100%',
        maxWidth: '800px',
      }}>
        <h1 style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: '3rem',
          textTransform: 'uppercase',
          letterSpacing: '5px',
          margin: 0,
          color: colors.phoenixAzure,
        }}>
          A.I.C.E. Operational Intake
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: colors.interfaceGrey,
          marginTop: '10px',
          maxWidth: '600px',
          marginRight: 'auto',
          marginLeft: 'auto',
        }}>
          Adaptive Intelligence Control of Entropy. Specialized support for authorized institutional clients governing chaotic systems. 
        </p>
      </header>

      {/* INTAKE FORM NODE */}
      <main style={{
        width: '100%',
        maxWidth: '700px',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        padding: '30px',
        borderRadius: '15px',
        border: `1px solid rgba(0, 255, 255, 0.2)`,
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
      }}>
        <form onSubmit={handleIntakeSubmit}>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            marginBottom: '20px',
          }}>
            <InputField 
              label="Full Name [Operator]" 
              type="text" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <InputField 
              label="Company [Organization]" 
              type="text" 
              required 
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
            />
            <InputField 
              label="Email Address" 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField 
              label="Phone Number" 
              type="tel" 
              required 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <InputField 
              label="Job Title [Role]" 
              type="text" 
              required 
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
            
            {/* Dynamic Class Selector */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{ 
                color: colors.phoenixAzure, 
                marginBottom: '5px', 
                textTransform: 'uppercase', 
                fontSize: '0.9rem',
                fontWeight: '600' 
              }}>Account Type [System Class]</label>
              <select 
                value={systemClass}
                onChange={(e) => setSystemClass(e.target.value)}
                style={{
                  padding: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: `1px solid ${colors.interfaceGrey}`,
                  borderRadius: '5px',
                  color: colors.starkWhite,
                  fontSize: '1rem',
                  fontFamily: readableFont,
                  cursor: 'pointer'
                }}
              >
                <option value="" style={{ backgroundColor: '#050505', color: '#00FFFF' }}>New User</option>
                <option value="class_s" style={{ backgroundColor: '#050505', color: '#FFFFFF' }}>Life-Critical [Class S]</option>
                <option value="class_1" style={{ backgroundColor: '#050505', color: '#FFFFFF' }}>Financial [Class 1]</option>
                <option value="class_2" style={{ backgroundColor: '#050505', color: '#FFFFFF' }}>Enterprise [Class 2]</option>
                <option value="class_3" style={{ backgroundColor: '#050505', color: '#FFFFFF' }}>Commercial [Class 3]</option>
              </select>
            </div>
          </div>

          <div style={{
            marginBottom: '20px',
            padding: '20px',
            border: `1px solid ${systemClass ? colors.warningCrimson : colors.phoenixAzure}`,
            backgroundColor: systemClass ? 'rgba(255, 69, 0, 0.1)' : 'rgba(0, 255, 255, 0.1)',
            borderRadius: '5px',
          }}>
            <InputField 
              label="Access Key [Telemetry/Diagnostics]" 
              type="text" 
              value={telemetryKey}
              onChange={(e) => setTelemetryKey(e.target.value)}
            />
            <p style={{ color: colors.interfaceGrey, fontSize: '0.8rem', marginTop: '10px' }}>
              If you have a designated key from prior communications, enter it here for priority triage. Otherwise, leave blank.
            </p>
          </div>

          <InputField 
            label="Subject [Issue / Deviance Type]" 
            type="text" 
            required 
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
            <label style={{ 
                color: colors.phoenixAzure, 
                marginBottom: '5px', 
                textTransform: 'uppercase', 
                fontSize: '0.9rem',
                fontWeight: '600'
            }}>Message [Diagnostic Details]</label>
            <textarea 
              rows={6}
              required
              value={diagnostics}
              onChange={(e) => setDiagnostics(e.target.value)}
              style={{
                padding: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: `1px solid ${colors.interfaceGrey}`,
                borderRadius: '5px',
                color: colors.starkWhite,
                fontSize: '1rem',
                fontFamily: readableFont,
                resize: 'vertical',
              }}
              placeholder="Describe your request or issue here..."
            ></textarea>
          </div>

          {submitStatus && (
            <div style={{
              marginTop: '20px',
              padding: '15px',
              border: `1px solid ${submitStatus.includes('SUCCESS') || submitStatus.includes('SECURED') ? '#00FF00' : submitStatus.includes('ERROR') || submitStatus.includes('FAILED') ? colors.warningCrimson : colors.phoenixAzure}`,
              color: submitStatus.includes('SUCCESS') || submitStatus.includes('SECURED') ? '#00FF00' : submitStatus.includes('ERROR') || submitStatus.includes('FAILED') ? colors.warningCrimson : colors.phoenixAzure,
              backgroundColor: 'rgba(0,0,0,0.5)',
              textAlign: 'center',
              fontFamily: readableFont,
              fontWeight: 'bold',
              letterSpacing: '1px'
            }}>
              {submitStatus}
            </div>
          )}

          <button type="submit" disabled={isSubmitting} style={{
            marginTop: '30px',
            width: '100%',
            padding: '15px',
            backgroundColor: isSubmitting ? 'transparent' : colors.phoenixAzure,
            color: isSubmitting ? colors.phoenixAzure : colors.deepViolet,
            border: `2px solid ${colors.phoenixAzure}`,
            borderRadius: '5px',
            fontSize: '1.2rem',
            textTransform: 'uppercase',
            fontFamily: readableFont,
            fontWeight: '800',
            letterSpacing: '3px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            opacity: isSubmitting ? 0.7 : 1
          }}>
            {isSubmitting ? 'TRANSMITTING...' : 'Submit Request'}
          </button>
        </form>
      </main>

      <footer style={{
        marginTop: '60px',
        textAlign: 'center',
        color: colors.interfaceGrey,
        fontSize: '0.9rem',
      }}>
        <p>A.I.C.E. Systems Corp. | A Registered Canadian Corporation</p>
        <p>Operational Command: Global | Triage Node</p>
        <p>Direct Inflows: billing@aice.network | legal@aice.network | partners@aice.network</p>
      </footer>
    </div>
  );
};

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, ...props }) => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label style={{ 
            color: colors.phoenixAzure, 
            marginBottom: '5px', 
            textTransform: 'uppercase', 
            fontSize: '0.9rem',
            fontWeight: '600'
        }}>{label}</label>
        <input 
            {...props}
            style={{
                padding: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: `1px solid ${colors.interfaceGrey}`,
                borderRadius: '5px',
                color: colors.starkWhite,
                fontSize: '1rem',
                fontFamily: readableFont,
                ...props.style
            }}
        />
    </div>
);

export default ContactUsPage;