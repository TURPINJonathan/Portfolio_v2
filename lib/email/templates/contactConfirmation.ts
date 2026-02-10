interface ContactConfirmationData {
  siteName: string;
  siteUrl: string;
  firstName: string;
  lastName: string;
  message: string;
  submittedAtParis: string; // déjà formaté
  // optionnel si tu veux afficher une image hébergée (moins recommandé niveau spam)
  robotImageUrl?: string; // ex: https://jonathan-turpin.fr/assets/stak-mail.png
  email: string; // adresse email du destinataire (pour le lien mailto:)
  phone: string; // numéro de téléphone du destinataire (optionnel, pour l'afficher dans l'email)
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

export function buildContactConfirmationEmail(data: ContactConfirmationData) {
  const hostname = tryGetHostname(data.siteUrl);
  const subject = `Votre message a bien été reçu`;

  const defaultLogoUrl =
    'https://jonathan-turpin.fr/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FStak_logo.813a76c2.png&w=640&q=75';

  // Par défaut on affiche le logo. Pour le désactiver explicitement : robotImageUrl="".
  const logoUrl =
    data.robotImageUrl === undefined
      ? defaultLogoUrl
      : data.robotImageUrl.trim().length > 0
        ? data.robotImageUrl
        : undefined;

  const safe = {
    siteName: escapeHtml(data.siteName),
    siteUrl: escapeHtml(data.siteUrl.replace(/\/$/, '')),
    firstName: escapeHtml(data.firstName),
    lastName: escapeHtml(data.lastName),
    message: escapeHtml(data.message),
    submittedAtParis: escapeHtml(data.submittedAtParis),
    hostname: escapeHtml(hostname),
    robotImageUrl: logoUrl ? escapeHtml(logoUrl) : undefined,
    email: escapeHtml(data.email),
    phone: data.phone.trim().length > 0 ? escapeHtml(data.phone) : undefined,
  };

  const signatureLogoCellHtml = safe.robotImageUrl
    ? `
                            <td valign="middle" style="width:92px; padding:0 14px 0 0; vertical-align:middle; text-align:center;">
                              <img
                                src="${safe.robotImageUrl}"
                                width="72"
                                height="72"
                                alt="Logo"
                                style="display:inline-block; border:0; outline:none; text-decoration:none; width:72px; height:72px; border-radius:14px;"
                              />
                            </td>
    `.trim()
    : '';

  const signatureSeparatorCellHtml = safe.robotImageUrl
    ? `
                            <td valign="middle" style="width:20px; padding:0 14px 0 0; vertical-align:middle; background-repeat:no-repeat; background-position:center; background-size:3px 100%; background-image:linear-gradient(180deg,#6d5efc 0%,#c77dff 55%,#6d5efc 100%);">
                              &nbsp;
                            </td>
    `.trim()
    : '';

  const signaturePhoneRowHtml = safe.phone
    ? `
                                      <tr>
                                        <td style="padding:0; font-size:13px; color:#bdb6e6;">
                                          <a href="tel:${safe.phone}" style="color:#bdb6e6; text-decoration:none;">${safe.phone}</a>
                                        </td>
                                      </tr>
    `.trim()
    : '';

  const text = [
    `Bonjour ${data.firstName} ${data.lastName},`,
    ``,
    `Merci, votre message a bien été reçu via ${hostname}.`,
    `Je vous répondrai dans les plus brefs délais.`,
    ``,
    `Récapitulatif`,
    `— Date : ${data.submittedAtParis}`,
    ``,
    `Votre message :`,
    `${data.message}`,
    ``,
    `Jonathan Turpin — Développeur web fullstack`,
    `Site : ${data.siteUrl.replace(/\/$/, '')}`,
    `Confidentialité : ${data.siteUrl.replace(/\/$/, '')}/privacy-policy`,
  ].join('\n');

  // HTML email (table-based, inline styles)
  const html = `
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="color-scheme" content="dark" />
    <meta name="supported-color-schemes" content="dark" />
    <title>Confirmation</title>
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
                <!-- Header
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td style="padding:0 6px 14px 6px;">
                      <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial; color:#e9e6ff; font-size:14px; letter-spacing:0.3px;">
                        <span style="display:inline-block; padding:6px 10px; border:1px solid rgba(199,125,255,0.35); background:rgba(125,70,180,0.12); border-radius:999px;">
                          ${safe.siteName}
                        </span>
                        <span style="float:right; color:#a9a3c7;">${safe.hostname}</span>
                      </div>
                    </td>
                  </tr>
                </table> -->

                <!-- Card -->
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#05040a" style="background-color:#05040a; border:1px solid rgba(255,255,255,0.10); border-radius:18px;">
                <!-- <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                  style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.10); border-radius:18px;"> -->
                  <tr>
                    <td bgcolor="#05040a" style="padding:22px 20px; background-color:#05040a;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial; color:#f3f1ff;">
                        <tr>
                          <td style="padding:0; font-size:22px; font-weight:800; letter-spacing:0.2px; color:#f3f1ff;">
                            Bonjour ${safe.firstName} ${safe.lastName},
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:10px 0 0 0; font-size:15px; line-height:1.65; color:#d7d3f1;">
                            J'accuse la bonne réception du message suivant :
                          </td>
                        </tr>

                        <!-- Recap row -->
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:14px;">
                          <tr>
                            <td bgcolor="#120f24" style="padding:12px 12px; background-color:#120f24; background:rgba(109,94,252,0.10); border:1px solid rgba(109,94,252,0.25); border-radius:14px;">
                              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                                <tr>
                                  <td style="padding:0; font-size:14px; color:#ffffff;">
                                    <span style="display:inline-block; padding:6px 10px; border-radius:999px; background-color:#1b1430; background:rgba(199,125,255,0.16); border:1px solid rgba(199,125,255,0.25);">
                                      🗓️ ${safe.submittedAtParis}
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="padding:12px 0 0 0; font-size:14px; color:#f3f1ff; line-height:1.7; white-space:pre-wrap;">
${safe.message}
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>

                        <!-- CTA -->
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:18px;">
                          <tr>
                            <td align="left">
                              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                                <tr>
                                  <td style="padding:0; font-size:15px; line-height:1.65; color:#d7d3f1;">
                                    Soyez assuré(e) que je mets tout en œuvre afin de vous apporter une réponse dans les meilleurs délais.
                                  </td>
                                </tr>
                                <tr>
                                  <td style="padding:0; font-size:15px; line-height:1.65; color:#d7d3f1;">
                                    Bien cordialement,
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>

                        <!-- Divider -->
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:18px;">
                          <tr>
                            <td height="1" style="height:1px; line-height:1px; font-size:0; background:rgba(255,255,255,0.10);">&nbsp;</td>
                          </tr>
                        </table>

                        <!-- Signature -->
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:14px; border-collapse:separate;">
                          <tr>
                            <td bgcolor="#0a0911" style="padding:12px; background-color:#0a0911; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.10); border-radius:14px;">
                              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                                <tr>
                                  ${signatureLogoCellHtml}
                                  ${signatureSeparatorCellHtml}
                                  <td style="padding:0; vertical-align:top;">
                                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:separate;">
                                      <tr>
                                        <td style="padding:0; font-size:14px; font-weight:800; color:#ffffff; letter-spacing:0.05em; line-height:1.2;">Jonathan Turpin</td>
                                      </tr>
                                      <tr>
                                        <td style="padding:2px 0 0 0; font-size:13px; color:#bdb6e6; line-height:1.35;">Développeur web fullstack</td>
                                      </tr>
                                      <tr>
                                        <td style="padding:6px 0 0 0; font-size:13px; color:#bdb6e6; line-height:1.35;">
                                          <a href="${safe.siteUrl}" style="color:#bdb6e6; text-decoration:none;">${safe.siteUrl}</a>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td style="padding:2px 0 0 0; font-size:13px; color:#bdb6e6; line-height:1.35;">
                                          <a href="mailto:${safe.email}" style="color:#bdb6e6; text-decoration:none;">${safe.email}</a>
                                        </td>
                                      </tr>
                                      ${signaturePhoneRowHtml}
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>

                      </table>
                    </td>
                  </tr>
                </table>

                <!-- Footer -->
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:14px;">
                  <tr>
                    <td style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial; padding:0; font-size:10px; color:#9a93bd; font-style:italic; text-align:center;">
                      <small>Ce message est une confirmation automatique afin de vous assurer que votre message a bien été reçu.</small>
                    </td>
                  </tr>
                  <tr>
                    <td style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial; padding: 0; font-size:10px; color:#9a93bd; text-align:center;">
                      <small><a href="${safe.siteUrl}/privacy-policy" style="color:#c77dff; text-decoration:none; font-style:italic;">Politique de confidentialité</a></small>
                    </td>
                  </tr>
                  <tr>
                    <td style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial; padding:12px 0 0 0; font-size:11px; color:#7f78a7; text-align:center;">
                      © ${new Date().getFullYear()} Jonathan Turpin
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
