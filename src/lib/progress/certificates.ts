// Certificate Generation Service
// Generates tamper-proof completion certificates

import { v4 as uuidv4 } from 'uuid';
import { createHash } from 'crypto';

export interface Certificate {
    id: string;
    uniqueCode: string; // For verification
    userId: string;
    userName: string;
    organizationId: string;
    organizationName: string;
    moduleId: string;
    moduleTitle: string;
    issuedAt: Date;
    expiresAt?: Date;
    score?: number;
    completionDate: Date;
    verificationHash: string;
    metadata: {
        duration: string;
        credits?: number;
        instructor?: string;
        accreditation?: string;
    };
}

export interface CertificateTemplate {
    id: string;
    name: string;
    design: 'modern' | 'classic' | 'elegant' | 'minimal';
    primaryColor: string;
    secondaryColor: string;
    logoUrl?: string;
    signature?: {
        name: string;
        title: string;
        signatureUrl?: string;
    };
}

const DEFAULT_TEMPLATE: CertificateTemplate = {
    id: 'default',
    name: 'ScaledNative Standard Certificate',
    design: 'modern',
    primaryColor: '#00D9FF',
    secondaryColor: '#8B5CF6',
};

export class CertificateService {
    private certificates = new Map<string, Certificate>();

    /**
     * Generate a new certificate
     */
    generateCertificate(params: {
        userId: string;
        userName: string;
        organizationId: string;
        organizationName: string;
        moduleId: string;
        moduleTitle: string;
        completionDate: Date;
        score?: number;
        duration?: string;
        expiresInMonths?: number;
    }): Certificate {
        const id = uuidv4();
        const uniqueCode = this.generateUniqueCode();
        const issuedAt = new Date();

        const expiresAt = params.expiresInMonths
            ? new Date(issuedAt.getTime() + params.expiresInMonths * 30 * 24 * 60 * 60 * 1000)
            : undefined;

        const certificate: Certificate = {
            id,
            uniqueCode,
            userId: params.userId,
            userName: params.userName,
            organizationId: params.organizationId,
            organizationName: params.organizationName,
            moduleId: params.moduleId,
            moduleTitle: params.moduleTitle,
            issuedAt,
            expiresAt,
            score: params.score,
            completionDate: params.completionDate,
            verificationHash: '', // Will be set below
            metadata: {
                duration: params.duration || 'Self-paced',
            },
        };

        // Generate verification hash
        certificate.verificationHash = this.generateVerificationHash(certificate);

        // Store
        this.certificates.set(id, certificate);

        return certificate;
    }

    /**
     * Verify a certificate
     */
    verifyCertificate(uniqueCode: string): {
        valid: boolean;
        certificate?: Certificate;
        reason?: string;
    } {
        // Find by unique code
        const certificate = Array.from(this.certificates.values()).find(
            c => c.uniqueCode === uniqueCode
        );

        if (!certificate) {
            return { valid: false, reason: 'Certificate not found' };
        }

        // Check expiration
        if (certificate.expiresAt && new Date() > certificate.expiresAt) {
            return { valid: false, reason: 'Certificate has expired', certificate };
        }

        // Verify hash integrity
        const expectedHash = this.generateVerificationHash(certificate);
        if (expectedHash !== certificate.verificationHash) {
            return { valid: false, reason: 'Certificate integrity check failed' };
        }

        return { valid: true, certificate };
    }

    /**
     * Get certificate by ID
     */
    getCertificate(id: string): Certificate | null {
        return this.certificates.get(id) || null;
    }

    /**
     * Get all certificates for a user
     */
    getUserCertificates(userId: string): Certificate[] {
        return Array.from(this.certificates.values()).filter(c => c.userId === userId);
    }

    /**
     * Generate certificate HTML
     */
    generateCertificateHTML(
        certificate: Certificate,
        template: CertificateTemplate = DEFAULT_TEMPLATE
    ): string {
        const formattedDate = certificate.completionDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        return `
<!DOCTYPE html>
<html>
<head>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap');
    
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    .certificate {
      width: 1056px;
      height: 816px;
      background: linear-gradient(135deg, #0A1628 0%, #162032 100%);
      padding: 48px;
      font-family: 'Inter', sans-serif;
      color: white;
      position: relative;
      overflow: hidden;
    }
    
    .border-frame {
      position: absolute;
      inset: 24px;
      border: 2px solid ${template.primaryColor}40;
      border-radius: 12px;
    }
    
    .corner-accent {
      position: absolute;
      width: 80px;
      height: 80px;
      border: 3px solid ${template.primaryColor};
    }
    
    .corner-tl { top: 36px; left: 36px; border-right: none; border-bottom: none; border-radius: 12px 0 0 0; }
    .corner-tr { top: 36px; right: 36px; border-left: none; border-bottom: none; border-radius: 0 12px 0 0; }
    .corner-bl { bottom: 36px; left: 36px; border-right: none; border-top: none; border-radius: 0 0 0 12px; }
    .corner-br { bottom: 36px; right: 36px; border-left: none; border-top: none; border-radius: 0 0 12px 0; }
    
    .content {
      position: relative;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      z-index: 1;
    }
    
    .logo {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 16px;
    }
    
    .logo span {
      background: linear-gradient(90deg, ${template.primaryColor}, ${template.secondaryColor});
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .title {
      font-family: 'Playfair Display', serif;
      font-size: 42px;
      font-weight: 700;
      color: ${template.primaryColor};
      margin-bottom: 8px;
      letter-spacing: 4px;
      text-transform: uppercase;
    }
    
    .subtitle {
      font-size: 16px;
      color: #94A3B8;
      margin-bottom: 48px;
      letter-spacing: 2px;
    }
    
    .recipient {
      font-family: 'Playfair Display', serif;
      font-size: 48px;
      font-weight: 600;
      margin-bottom: 24px;
      background: linear-gradient(90deg, white, #E2E8F0);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .module-title {
      font-size: 18px;
      color: #CBD5E1;
      margin-bottom: 8px;
    }
    
    .module-name {
      font-size: 24px;
      font-weight: 600;
      color: white;
      margin-bottom: 48px;
    }
    
    .date-section {
      display: flex;
      gap: 64px;
      margin-bottom: 48px;
    }
    
    .date-item {
      text-align: center;
    }
    
    .date-label {
      font-size: 12px;
      color: #64748B;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 4px;
    }
    
    .date-value {
      font-size: 16px;
      color: #E2E8F0;
    }
    
    .verification {
      position: absolute;
      bottom: 48px;
      font-size: 12px;
      color: #64748B;
    }
    
    .verification-code {
      font-family: monospace;
      color: ${template.primaryColor};
    }
    
    .score-badge {
      position: absolute;
      top: 60px;
      right: 60px;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: linear-gradient(135deg, ${template.primaryColor}, ${template.secondaryColor});
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    
    .score-value {
      font-size: 24px;
      font-weight: 700;
    }
    
    .score-label {
      font-size: 10px;
      opacity: 0.8;
    }
    
    .glow {
      position: absolute;
      width: 400px;
      height: 400px;
      border-radius: 50%;
      filter: blur(100px);
      opacity: 0.3;
    }
    
    .glow-1 {
      top: -100px;
      left: -100px;
      background: ${template.primaryColor};
    }
    
    .glow-2 {
      bottom: -100px;
      right: -100px;
      background: ${template.secondaryColor};
    }
  </style>
</head>
<body>
  <div class="certificate">
    <div class="glow glow-1"></div>
    <div class="glow glow-2"></div>
    <div class="border-frame"></div>
    <div class="corner-accent corner-tl"></div>
    <div class="corner-accent corner-tr"></div>
    <div class="corner-accent corner-bl"></div>
    <div class="corner-accent corner-br"></div>
    
    ${certificate.score ? `
    <div class="score-badge">
      <span class="score-value">${certificate.score}%</span>
      <span class="score-label">Score</span>
    </div>
    ` : ''}
    
    <div class="content">
      <div class="logo">Zero<span>G</span> Training</div>
      <h1 class="title">Certificate</h1>
      <p class="subtitle">of Completion</p>
      
      <p class="module-title">This certifies that</p>
      <h2 class="recipient">${certificate.userName}</h2>
      
      <p class="module-title">has successfully completed</p>
      <h3 class="module-name">${certificate.moduleTitle}</h3>
      
      <div class="date-section">
        <div class="date-item">
          <p class="date-label">Date Completed</p>
          <p class="date-value">${formattedDate}</p>
        </div>
        <div class="date-item">
          <p class="date-label">Duration</p>
          <p class="date-value">${certificate.metadata.duration}</p>
        </div>
        <div class="date-item">
          <p class="date-label">Issued By</p>
          <p class="date-value">${certificate.organizationName}</p>
        </div>
      </div>
    </div>
    
    <p class="verification">
      Verify at zerogtraining.com/verify | Code: <span class="verification-code">${certificate.uniqueCode}</span>
    </p>
  </div>
</body>
</html>`;
    }

    // Private helpers

    private generateUniqueCode(): string {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Avoid confusing chars
        let code = '';
        for (let i = 0; i < 12; i++) {
            if (i > 0 && i % 4 === 0) code += '-';
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }

    private generateVerificationHash(certificate: Certificate): string {
        const data = `${certificate.id}|${certificate.userId}|${certificate.moduleId}|${certificate.completionDate.toISOString()}|${certificate.uniqueCode}`;
        return createHash('sha256').update(data).digest('hex').substring(0, 32);
    }
}

// Singleton
let certificateService: CertificateService | null = null;

export function getCertificateService(): CertificateService {
    if (!certificateService) {
        certificateService = new CertificateService();
    }
    return certificateService;
}
