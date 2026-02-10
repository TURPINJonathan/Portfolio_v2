interface IncomingContactData {
  siteName: string;
  siteUrl: string;
  civilityLabel: string;
  firstName: string;
  lastName: string;
  company?: string;
  role?: string;
  email: string;
  phone?: string;
  message: string;
  submittedAtParis: string;
}

function tryGetHostname(siteUrl: string) {
  try {
    return new URL(siteUrl).hostname;
  } catch {
    return siteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function buildIncomingContactEmail(data: IncomingContactData) {
  const hostname = tryGetHostname(data.siteUrl);

  const subjectParts = [`Nouveau message`, `${data.firstName} ${data.lastName}`];
  if (data.company) subjectParts.push(data.company);
  const subject = `[${data.siteName}] ${subjectParts.join(' — ')}`;

  const lines = [
    `Appellation : ${data.civilityLabel}`,
    `Nom : ${data.lastName}`,
    `Prénom : ${data.firstName}`,
    data.company ? `Entreprise : ${data.company}` : undefined,
    data.role ? `Fonction : ${data.role}` : undefined,
    `Email : ${data.email}`,
    data.phone ? `Téléphone : ${data.phone}` : undefined,
    '',
    'Message :',
    data.message,
    '',
    `Date : ${data.submittedAtParis}`,
    `Source : ${data.siteUrl}/contact`,
  ].filter(Boolean);

  const text = lines.join('\n');

  const canonicalSiteUrl = data.siteUrl.replace(/\/$/, '');

  const safe = {
    siteName: escapeHtml(data.siteName),
    siteUrl: escapeHtml(canonicalSiteUrl),
    hostname: escapeHtml(hostname),
    civilityLabel: escapeHtml(data.civilityLabel),
    firstName: escapeHtml(data.firstName),
    lastName: escapeHtml(data.lastName),
    company: data.company ? escapeHtml(data.company) : undefined,
    role: data.role ? escapeHtml(data.role) : undefined,
    email: escapeHtml(data.email),
    phone: data.phone && data.phone.trim().length > 0 ? escapeHtml(data.phone) : undefined,
    message: escapeHtml(data.message),
    submittedAtParis: escapeHtml(data.submittedAtParis),
  };

  const html = `
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="color-scheme" content="dark" />
    <meta name="supported-color-schemes" content="dark" />
    <title>Nouveau message</title>
  </head>
  <body style="margin:0;padding:0;background-color:#05040a;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#05040a" style="background-color:#05040a;">
      <tr>
        <td align="center" bgcolor="#05040a" style="padding:28px 16px; background-color:#05040a;">
          <!-- Container -->
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:600px;max-width:600px;">
            <!-- Top glow -->
            <tr>
              <td style="padding:0;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td height="3" style="height:3px; line-height:3px; font-size:0; background-color:#6d5efc; background:linear-gradient(90deg,#6d5efc 0%,#c77dff 45%,#6d5efc 100%); border-radius:999px;">
                      &nbsp;
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:18px 0 0 0;">
                <!-- Card -->
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#05040a" style="background-color:#05040a; border:1px solid rgba(255,255,255,0.10); border-radius:18px;">
                  <tr>
                    <td bgcolor="#05040a" style="padding:22px 20px; background-color:#05040a;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial; color:#f3f1ff;">
                        <tr>
                          <td style="padding:0; font-size:20px; font-weight:800; letter-spacing:0.2px; color:#f3f1ff;">
                            Nouveau message (formulaire de contact)
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:6px 0 0 0; font-size:13px; color:#a9a3c7;">
                            ${safe.hostname} — ${safe.submittedAtParis}
                          </td>
                        </tr>

                        <!-- Recap -->
                        <tr>
                          <td style="padding:16px 0 0 0;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:separate;">
                              <tr>
                                <td bgcolor="#120f24" style="padding:12px 12px; background-color:#120f24; background:rgba(109,94,252,0.10); border:1px solid rgba(109,94,252,0.25); border-radius:14px;">
                                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                                    <tr>
                                      <td style="padding:0 0 10px 0; font-size:14px; color:#ffffff;">
                                        <span style="display:inline-block; padding:6px 10px; border-radius:999px; background-color:#1b1430; background:rgba(199,125,255,0.16); border:1px solid rgba(199,125,255,0.25);">
                                          👤 ${safe.civilityLabel} ${safe.firstName} ${safe.lastName}
                                        </span>
                                      </td>
                                    </tr>

                                    <tr>
                                      <td style="padding:0;">
                                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size:13px; color:#d7d3f1; line-height:1.55;">
                                          <tr>
                                            <td style="padding:4px 0; width:170px; color:#bdb6e6;">Appellation</td>
                                            <td style="padding:4px 0;">${safe.civilityLabel}</td>
                                          </tr>
                                          <tr>
                                            <td style="padding:4px 0; color:#bdb6e6;">Email</td>
                                            <td style="padding:4px 0;"><a href="mailto:${safe.email}" style="color:#c77dff; text-decoration:none;">${safe.email}</a></td>
                                          </tr>
                                          ${
                                            safe.phone
                                              ? `
                                          <tr>
                                            <td style="padding:4px 0; color:#bdb6e6;">Téléphone</td>
                                            <td style="padding:4px 0;"><a href="tel:${safe.phone}" style="color:#c77dff; text-decoration:none;">${safe.phone}</a></td>
                                          </tr>
                                          `.trim()
                                              : ''
                                          }
                                          ${
                                            safe.company
                                              ? `
                                          <tr>
                                            <td style="padding:4px 0; color:#bdb6e6;">Entreprise</td>
                                            <td style="padding:4px 0;">${safe.company}</td>
                                          </tr>
                                          `.trim()
                                              : ''
                                          }
                                          ${
                                            safe.role
                                              ? `
                                          <tr>
                                            <td style="padding:4px 0; color:#bdb6e6;">Fonction</td>
                                            <td style="padding:4px 0;">${safe.role}</td>
                                          </tr>
                                          `.trim()
                                              : ''
                                          }
                                          <tr>
                                            <td style="padding:4px 0; color:#bdb6e6;">Source</td>
                                            <td style="padding:4px 0;"><a href="${safe.siteUrl}/contact" style="color:#c77dff; text-decoration:none;">${safe.siteUrl}/contact</a></td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>

                        <!-- Message -->
                        <tr>
                          <td style="padding:14px 0 0 0; font-size:13px; color:#bdb6e6;">Message</td>
                        </tr>
                        <tr>
                          <td style="padding:8px 0 0 0;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:separate;">
                              <tr>
                                <td bgcolor="#0a0911" style="padding:12px 12px; background-color:#0a0911; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.10); border-radius:14px; font-size:14px; color:#f3f1ff; line-height:1.7; white-space:pre-wrap;">
${safe.message}
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>

                      </table>
                    </td>
                  </tr>
                </table>

                <!-- Footer -->
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:14px;">
                  <tr>
                    <td style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial; padding:0; font-size:11px; color:#7f78a7; text-align:center;">
                      © ${new Date().getFullYear()} ${safe.siteName}
                    </td>
                  </tr>
                </table>

              </td>
            </tr>
          </table>
          <!-- /Container -->
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();

  return { subject, text, html };
}
