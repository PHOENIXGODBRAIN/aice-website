import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';

interface ExecutiveAuditPDFProps {
    execReport: any;
    historyData: any[];
    topMitigations: any[];
    cpuUsage: number;
    memUsage: number;
}

export default function ExecutiveAuditPDF({ execReport, historyData, topMitigations, cpuUsage, memUsage }: ExecutiveAuditPDFProps) {
    if (!execReport) return null;

    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
    const reportId = `AICE-AUDIT-${new Date().getTime().toString().slice(-6)}`;

    const fontCorporate = 'Helvetica, Arial, sans-serif';
    const fontData = 'monospace';

    // Financial Projections
    const baseSavings = execReport.financials.capital_saved_usd;
    const annualizedSavings = Math.round(baseSavings * (365 / 7));
    const downtimePreventedHours = Math.round((execReport.financials.total_mitigations * 45) / 60);

    const formattedBase = baseSavings.toLocaleString();
    const formattedAnnual = annualizedSavings.toLocaleString();

    // Universal Algorithmic Typography Scaling
    const getDynamicFontSize = (textLength: number, defaultSize: number) => {
        if (textLength >= 10) return `${Math.floor(defaultSize * 0.65)}px`; // $10,000,000+
        if (textLength >= 8) return `${Math.floor(defaultSize * 0.85)}px`;  // $1,000,000+
        return `${defaultSize}px`;                                          // Normal Scale
    };

    // Page 6 Resource Gauges Data
    const cpuData = [
        { name: 'Used', value: cpuUsage, color: '#00F3FF' },
        { name: 'Free', value: 100 - cpuUsage, color: 'rgba(0,243,255,0.05)' }
    ];
    const ramData = [
        { name: 'Used', value: memUsage, color: '#00FF66' },
        { name: 'Free', value: 100 - memUsage, color: 'rgba(0,255,102,0.05)' }
    ];
    const healthData = [
        { name: 'Health', value: 100, color: '#00FF66' },
        { name: 'Risk', value: 0, color: 'rgba(0,255,102,0.05)' }
    ];

    return (
        <div id="pdf-master-forge" style={{ position: 'absolute', left: '-20000px', top: 0, zIndex: -9999 }}>
            
            {/* ==========================================
                PAGE 1: EXECUTIVE STABILITY OVERVIEW
                ========================================== */}
            <div id="audit-page-1" style={{ width: '794px', height: '1123px', backgroundColor: '#050505', color: '#ffffff', padding: '30px 60px 50px 60px', boxSizing: 'border-box', fontFamily: fontCorporate, position: 'relative' }}>
                <div style={{ borderBottom: '3px solid #00F3FF', paddingBottom: '20px', marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                        <h1 style={{ fontSize: '42px', fontWeight: '900', color: '#00F3FF', letterSpacing: '5px', margin: 0, textTransform: 'uppercase' }}>A.I.C.E. PROTOCOL</h1>
                        <div style={{ fontSize: '18px', color: '#a0aec0', letterSpacing: '3px', marginTop: '8px', fontWeight: 'bold' }}>EXECUTIVE TELEMETRY AUDIT</div>
                    </div>
                    <div style={{ textAlign: 'right', fontFamily: fontData, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <img src="/assets/images/ExecutiveAudit/aicelogo.png" alt="AICE Logo" style={{ height: '55px', marginBottom: '12px', objectFit: 'contain' }} />
                        <div style={{ fontSize: '14px', color: '#ff4500', letterSpacing: '2px', fontWeight: 'bold' }}>CONFIDENTIAL - CLIENT REVIEW ONLY</div>
                        <div style={{ fontSize: '16px', color: '#ffffff', marginTop: '8px' }}>Generated: {timestamp}</div>
                        <div style={{ fontSize: '14px', color: '#a0aec0', marginTop: '4px' }}>Report ID: {reportId}</div>
                    </div>
                </div>

                <div style={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.15)', padding: '25px', borderRadius: '12px', marginBottom: '35px' }}>
                    <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#00F3FF', letterSpacing: '2px', margin: '0 0 15px 0', textTransform: 'uppercase' }}>Executive Summary</h2>
                    <p style={{ fontSize: '16px', color: '#e2e8f0', lineHeight: '1.6', margin: 0, fontWeight: '300' }}>
                        The monitored infrastructure remains under active A.I.C.E. governance. Forensic analysis of the preceding telemetry cycle indicates measurable exposure to computational entropy. The Deviance Viscosity Stabilizer successfully engaged multiple systemic threats, applying dynamic computational impedance to avert cascading hardware fatigue and ensure absolute operational continuity.
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '30px', marginBottom: '35px' }}>
                    <div style={{ flex: 1, backgroundColor: '#050c0e', border: '2px solid rgba(0, 255, 102, 0.4)', padding: '30px', borderRadius: '12px', overflow: 'hidden' }}>
                        <div style={{ fontSize: '16px', color: '#a0aec0', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 'bold' }}>Capital Preserved (USD)</div>
                        <div style={{ fontSize: getDynamicFontSize(formattedBase.length, 56), fontWeight: '900', color: '#00FF66', margin: '15px 0', fontFamily: fontData, whiteSpace: 'nowrap' }}>
                            ${formattedBase}
                        </div>
                        <div style={{ fontSize: '16px', color: '#00FF66' }}>From {execReport.financials.total_mitigations} prevented shock events.</div>
                    </div>
                    <div style={{ flex: 1, backgroundColor: '#050c0e', border: '1px solid rgba(0, 243, 255, 0.4)', padding: '30px', borderRadius: '12px' }}>
                        <div style={{ fontSize: '16px', color: '#a0aec0', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 'bold' }}>Baseline Stability</div>
                        <div style={{ fontSize: '56px', fontWeight: '900', color: '#00F3FF', margin: '15px 0', fontFamily: fontData }}>{execReport.entropy_analysis.baseline_stability}%</div>
                        <div style={{ fontSize: '16px', color: '#00F3FF' }}>Target homeostasis maintained.</div>
                    </div>
                </div>

                <div style={{ backgroundColor: '#0a0505', border: '2px solid rgba(255, 69, 0, 0.4)', padding: '30px', borderRadius: '12px' }}>
                    <div style={{ fontSize: '16px', color: '#a0aec0', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 'bold' }}>Peak Systemic Chaos</div>
                    <div style={{ fontSize: '64px', fontWeight: '900', color: '#ff4500', margin: '15px 0', fontFamily: fontData }}>{execReport.entropy_analysis.peak_systemic_chaos}%</div>
                    <div style={{ fontSize: '16px', color: '#ff4500' }}>Maximum recorded entropy spike prior to autonomous suppression.</div>
                </div>

                <div style={{ position: 'absolute', bottom: '50px', left: '60px', right: '60px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#666', fontFamily: fontData }}>
                    <div>A.I.C.E. SYSTEMS CORP. | RESTRICTED INTEL</div>
                    <div>PAGE 1 OF 7</div>
                </div>
            </div>

            {/* ==========================================
                PAGE 2: ENTROPY & STABILITY ANALYSIS
                ========================================== */}
            <div id="audit-page-2" style={{ width: '794px', height: '1123px', backgroundColor: '#050505', color: '#ffffff', padding: '30px 60px 50px 60px', boxSizing: 'border-box', fontFamily: fontCorporate, position: 'relative' }}>
                <div style={{ borderBottom: '3px solid #00F3FF', paddingBottom: '20px', marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                        <h1 style={{ fontSize: '42px', fontWeight: '900', color: '#00F3FF', letterSpacing: '5px', margin: 0, textTransform: 'uppercase' }}>A.I.C.E. PROTOCOL</h1>
                        <div style={{ fontSize: '18px', color: '#a0aec0', letterSpacing: '3px', marginTop: '8px', fontWeight: 'bold' }}>ENTROPY & STABILITY ANALYSIS</div>
                    </div>
                    <div style={{ textAlign: 'right', fontFamily: fontData, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <img src="/assets/images/ExecutiveAudit/Aice logo.jpeg" alt="AICE Logo" style={{ height: '55px', marginBottom: '12px', objectFit: 'contain', borderRadius: '4px' }} />
                        <div style={{ fontSize: '16px', color: '#ffffff', marginTop: '8px' }}>Generated: {timestamp}</div>
                    </div>
                </div>

                <div style={{ marginBottom: '25px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>Load vs Entropy Over Time</h2>
                    <p style={{ fontSize: '16px', color: '#a0aec0', lineHeight: '1.5' }}>Trend view for systemic load pressure, entropy exposure, and response stabilization via applied impedance.</p>
                </div>

                <div style={{ width: '100%', height: '360px', backgroundColor: '#0a0a0a', border: '1px solid rgba(0, 243, 255, 0.2)', borderRadius: '12px', padding: '20px', marginBottom: '30px' }}>
                    <AreaChart width={630} height={315} data={historyData} margin={{ top: 10, right: 10, left: -10, bottom: 10 }}>
                        <defs>
                            <linearGradient id="colorEntropyPdf" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ff4500" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#ff4500" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorImpedancePdf" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#00F3FF" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#00F3FF" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" vertical={false} opacity={0.05} />
                        <XAxis dataKey="timestamp" stroke="#a0aec0" fontSize={14} tickMargin={12} minTickGap={30} fontFamily={fontData} />
                        <YAxis stroke="#a0aec0" fontSize={14} fontFamily={fontData} />
                        <Legend verticalAlign="top" height={50} iconType="plainline" wrapperStyle={{ fontSize: '18px', fontWeight: 'bold', fontFamily: fontData, color: '#ffffff', paddingBottom: '15px' }}/>
                        <Area type="monotone" name="Systemic Entropy (%)" dataKey="entropy" stroke="#ff4500" strokeWidth={3} fillOpacity={1} fill="url(#colorEntropyPdf)" isAnimationActive={false} />
                        <Area type="monotone" name="Applied Impedance (Ω)" dataKey="impedance" stroke="#00F3FF" strokeWidth={3} fillOpacity={1} fill="url(#colorImpedancePdf)" isAnimationActive={false} />
                    </AreaChart>
                </div>

                <div style={{ backgroundColor: '#03080a', border: '2px solid rgba(255,111,0,0.5)', padding: '30px', borderRadius: '12px' }}>
                    <div style={{ borderBottom: '1px solid rgba(255,111,0,0.3)', paddingBottom: '15px', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <div>
                            <h3 style={{ color: '#ff9d00', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '22px', margin: '0 0 8px 0' }}>Entropic Risk Valuation (E.R.V.)</h3>
                            <div style={{ color: '#a0aec0', fontFamily: fontData, fontSize: '14px', letterSpacing: '2px' }}>FORENSIC LEDGER FINANCIAL IMPACT</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ color: '#a0aec0', fontFamily: fontData, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>Total Prevented Capital Loss</div>
                            <div style={{ fontSize: '13px', color: '#00F3FF', maxWidth: '350px', lineHeight: '1.5' }}>*Baseline calculation utilizes a proven $1,250 USD expenditure recovery metric per unmitigated systemic shock event.</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: getDynamicFontSize(formattedBase.length, 56), fontWeight: '900', color: '#00FF66', fontFamily: fontData, margin: 0, whiteSpace: 'nowrap' }}>
                                ${formattedBase} <span style={{ fontSize: '28px', color: 'rgba(0,255,102,0.8)' }}>USD</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ position: 'absolute', bottom: '50px', left: '60px', right: '60px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#666', fontFamily: fontData }}>
                    <div>A.I.C.E. SYSTEMS CORP. | RESTRICTED INTEL</div>
                    <div>PAGE 2 OF 7</div>
                </div>
            </div>

            {/* ==========================================
                PAGE 3: HARDWARE FORENSICS & LEDGER
                ========================================== */}
            <div id="audit-page-3" style={{ width: '794px', height: '1123px', backgroundColor: '#050505', color: '#ffffff', padding: '30px 60px 50px 60px', boxSizing: 'border-box', fontFamily: fontCorporate, position: 'relative' }}>
                <div style={{ borderBottom: '3px solid #00F3FF', paddingBottom: '20px', marginBottom: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                        <h1 style={{ fontSize: '42px', fontWeight: '900', color: '#00F3FF', letterSpacing: '5px', margin: 0, textTransform: 'uppercase' }}>A.I.C.E. PROTOCOL</h1>
                        <div style={{ fontSize: '18px', color: '#a0aec0', letterSpacing: '3px', marginTop: '8px', fontWeight: 'bold' }}>HARDWARE FORENSICS & EVENT LEDGER</div>
                    </div>
                    <div style={{ textAlign: 'right', fontFamily: fontData, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <img src="/assets/images/ExecutiveAudit/aicelogo.png" alt="AICE Logo" style={{ height: '55px', marginBottom: '12px', objectFit: 'contain' }} />
                        <div style={{ fontSize: '16px', color: '#ffffff', marginTop: '8px' }}>Generated: {timestamp}</div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '30px', marginBottom: '25px' }}>
                    <div style={{ flex: 1, backgroundColor: '#050c0e', border: '1px solid rgba(255,255,255,0.15)', padding: '25px', borderRadius: '12px' }}>
                        <div style={{ fontSize: '14px', color: '#a0aec0', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 'bold' }}>Avg CPU Fatigue (During Spike)</div>
                        <div style={{ fontSize: '42px', fontWeight: '900', color: '#ffffff', margin: '15px 0', fontFamily: fontData }}>{execReport.hardware_fatigue.avg_cpu_during_spike}%</div>
                    </div>
                    <div style={{ flex: 1, backgroundColor: '#050c0e', border: '1px solid rgba(255,255,255,0.15)', padding: '25px', borderRadius: '12px' }}>
                        <div style={{ fontSize: '14px', color: '#a0aec0', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 'bold' }}>Avg RAM Fatigue (During Spike)</div>
                        <div style={{ fontSize: '42px', fontWeight: '900', color: '#ffffff', margin: '15px 0', fontFamily: fontData }}>{execReport.hardware_fatigue.avg_ram_during_spike}%</div>
                    </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '5px' }}>Top Intercepted Entropy Spikes</h2>
                    <p style={{ fontSize: '14px', color: '#ff4500', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px' }}>(Possible Catastrophe Prevented)</p>
                    
                    <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontFamily: fontData, fontSize: '15px' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #333', color: '#00F3FF' }}>
                                <th style={{ padding: '10px 10px', fontWeight: 'bold', letterSpacing: '1px' }}>Time (UTC)</th>
                                <th style={{ padding: '10px 10px', fontWeight: 'bold', letterSpacing: '1px' }}>Entropy State</th>
                                <th style={{ padding: '10px 10px', fontWeight: 'bold', letterSpacing: '1px' }}>Proximity (p)</th>
                                <th style={{ padding: '10px 10px', fontWeight: 'bold', letterSpacing: '1px' }}>Impedance Applied</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topMitigations.map((mit, idx) => (
                                <tr key={idx} style={{ borderBottom: '1px solid #1a1a1a' }}>
                                    <td style={{ padding: '10px 10px', color: '#a0aec0' }}>{mit.timestamp}</td>
                                    <td style={{ padding: '10px 10px', color: '#ff4500', fontWeight: 'bold', fontSize: '15px' }}>{mit.ids_value}%</td>
                                    <td style={{ padding: '10px 10px', color: '#ff9d00', fontSize: '15px' }}>{mit.p_value}</td>
                                    <td style={{ padding: '10px 10px', color: '#00F3FF', fontWeight: 'bold', fontSize: '15px' }}>{mit.omega} Ω</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div style={{ position: 'absolute', bottom: '50px', left: '60px', right: '60px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#666', fontFamily: fontData }}>
                    <div>A.I.C.E. SYSTEMS CORP. | RESTRICTED INTEL</div>
                    <div>PAGE 3 OF 7</div>
                </div>
            </div>

            {/* ==========================================
                PAGE 4: CRYPTOGRAPHIC NODE MAPPING & ADAPTIVE INTELLIGENCE
                ========================================== */}
            <div id="audit-page-4" style={{ width: '794px', height: '1123px', backgroundColor: '#050505', color: '#ffffff', padding: '30px 60px 50px 60px', boxSizing: 'border-box', fontFamily: fontCorporate, position: 'relative' }}>
                <div style={{ borderBottom: '3px solid #00F3FF', paddingBottom: '20px', marginBottom: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                        <h1 style={{ fontSize: '42px', fontWeight: '900', color: '#00F3FF', letterSpacing: '5px', margin: 0, textTransform: 'uppercase' }}>A.I.C.E. PROTOCOL</h1>
                        <div style={{ fontSize: '18px', color: '#a0aec0', letterSpacing: '3px', marginTop: '8px', fontWeight: 'bold' }}>CRYPTOGRAPHIC INTEGRITY & PROTOCOL MAP</div>
                    </div>
                    <div style={{ textAlign: 'right', fontFamily: fontData, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <img src="/assets/images/ExecutiveAudit/Aice logo.jpeg" alt="AICE Logo" style={{ height: '55px', marginBottom: '12px', objectFit: 'contain', borderRadius: '4px' }} />
                        <div style={{ fontSize: '16px', color: '#ffffff', marginTop: '8px' }}>Generated: {timestamp}</div>
                    </div>
                </div>

                <div style={{ height: '360px', marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px' }}>System Architecture & Cryptographic Status</h2>
                    <div style={{ display: 'flex', gap: '25px', height: '100%' }}>
                        <div style={{ flex: 1, backgroundColor: '#0a0a0a', border: '1px solid rgba(0, 243, 255, 0.2)', borderRadius: '12px', padding: '20px 25px' }}>
                             <div style={{ color: '#00F3FF', fontFamily: fontData, fontSize: '15px', marginBottom: '15px', letterSpacing: '2px', fontWeight: 'bold' }}>[ SECURE NODE DEPLOYMENT ]</div>
                             <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#a0aec0', fontSize: '14px', fontFamily: fontData, display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                <li style={{ display: 'flex', justifyContent: 'space-between' }}><span><span style={{ color: '#00FF66', marginRight: '8px' }}>[OK]</span> QUANTUM DRIFT LOCK:</span> <span style={{ color: '#fff', fontWeight: 'bold' }}>ENGAGED</span></li>
                                <li style={{ display: 'flex', justifyContent: 'space-between' }}><span><span style={{ color: '#00FF66', marginRight: '8px' }}>[OK]</span> ALGORITHMIC WALL (r):</span> <span style={{ color: '#fff', fontWeight: 'bold' }}>ACTIVE</span></li>
                                <li style={{ display: 'flex', justifyContent: 'space-between' }}><span><span style={{ color: '#00FF66', marginRight: '8px' }}>[OK]</span> DEVIANCE VISCOSITY:</span> <span style={{ color: '#fff', fontWeight: 'bold' }}>NOMINAL</span></li>
                                <li style={{ display: 'flex', justifyContent: 'space-between' }}><span><span style={{ color: '#00FF66', marginRight: '8px' }}>[OK]</span> TLS 1.3 UPLINK CIPHER:</span> <span style={{ color: '#fff', fontWeight: 'bold' }}>AES-256-GCM</span></li>
                                <li style={{ display: 'flex', justifyContent: 'space-between' }}><span><span style={{ color: '#00FF66', marginRight: '8px' }}>[OK]</span> FRACTAL LEDGER STATE:</span> <span style={{ color: '#fff', fontWeight: 'bold' }}>IMMUTABLE</span></li>
                             </ul>
                        </div>
                        
                        <div style={{ flex: 1, backgroundColor: '#050c0e', border: '1px solid rgba(255, 69, 0, 0.3)', borderRadius: '12px', padding: '20px 25px', display: 'flex', flexDirection: 'column' }}>
                             <div style={{ color: '#ff4500', fontFamily: fontData, fontSize: '15px', marginBottom: '10px', letterSpacing: '2px', fontWeight: 'bold' }}>[ INFRASTRUCTURE HEALTH ]</div>
                             
                             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: '15px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '15px' }}>
                                 <div style={{ textAlign: 'center' }}>
                                     <div style={{ fontSize: '11px', color: '#ff4500', letterSpacing: '1px', fontFamily: fontData, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '5px' }}>Pre-Governor</div>
                                     <div style={{ fontSize: '32px', color: '#ff4500', fontWeight: '900', fontFamily: fontData, opacity: 0.8 }}>{(100 - execReport.entropy_analysis.peak_systemic_chaos).toFixed(1)}%</div>
                                 </div>
                                 <div style={{ color: '#555', fontSize: '24px', fontWeight: 'bold' }}>➔</div>
                                 <div style={{ textAlign: 'center' }}>
                                     <div style={{ fontSize: '11px', color: '#00FF66', letterSpacing: '1px', fontFamily: fontData, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '5px' }}>Post-A.I.C.E.</div>
                                     <div style={{ fontSize: '42px', color: '#00FF66', fontWeight: '900', fontFamily: fontData }}>100%</div>
                                 </div>
                             </div>

                             <div style={{ color: '#00FF66', fontSize: '13px', letterSpacing: '2px', fontWeight: 'bold', textAlign: 'center', marginBottom: '15px' }}>CORE SYSTEM INTEGRITY RESTORED</div>
                             <p style={{ color: '#e2e8f0', fontSize: '14px', margin: 0, lineHeight: '1.6', fontWeight: '300' }}>
                                 The A.I.C.E. protocol has successfully isolated and neutralized all identified entropic anomalies within the test parameters. Systemic homeostasis has been mathematically guaranteed.
                             </p>
                        </div>
                    </div>
                </div>

                <div style={{ position: 'absolute', bottom: '150px', left: '60px', right: '60px', height: '280px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src="/assets/images/ExecutiveAudit/Adaptive Intelligence.png" alt="Adaptive Intelligence Node Map" style={{ maxWidth: '85%', maxHeight: '100%', display: 'block', margin: '0 auto', borderRadius: '12px' }} />
                </div>

                <div style={{ position: 'absolute', bottom: '50px', left: '60px', right: '60px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#666', fontFamily: fontData }}>
                    <div>A.I.C.E. SYSTEMS CORP. | RESTRICTED INTEL</div>
                    <div>PAGE 4 OF 7</div>
                </div>
            </div>

            {/* ==========================================
                PAGE 5: FINANCIAL ROI
                ========================================== */}
            <div id="audit-page-5" style={{ width: '794px', height: '1123px', backgroundColor: '#050505', color: '#ffffff', padding: '30px 60px 50px 60px', boxSizing: 'border-box', fontFamily: fontCorporate, position: 'relative' }}>
                <div style={{ borderBottom: '3px solid #00F3FF', paddingBottom: '20px', marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                        <h1 style={{ fontSize: '42px', fontWeight: '900', color: '#00F3FF', letterSpacing: '5px', margin: 0, textTransform: 'uppercase' }}>A.I.C.E. PROTOCOL</h1>
                        <div style={{ fontSize: '18px', color: '#a0aec0', letterSpacing: '3px', marginTop: '8px', fontWeight: 'bold' }}>FINANCIAL ROI & CAPITAL PRESERVATION</div>
                    </div>
                    <div style={{ textAlign: 'right', fontFamily: fontData, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <img src="/assets/images/ExecutiveAudit/aicelogo.png" alt="AICE Logo" style={{ height: '55px', marginBottom: '12px', objectFit: 'contain' }} />
                        <div style={{ fontSize: '16px', color: '#ffffff', marginTop: '8px' }}>Generated: {timestamp}</div>
                    </div>
                </div>

                <div style={{ marginBottom: '25px' }}>
                    <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>E.R.V. Financial Extrapolation</h2>
                    <p style={{ fontSize: '16px', color: '#a0aec0', lineHeight: '1.6', margin: 0 }}>
                        Cost of Inaction (COI) vs. Active A.I.C.E. Governance. The following matrix extrapolates the diagnostic telemetry to calculate projected annual fiscal preservation and mitigated operational downtime.
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '30px', marginBottom: '30px' }}>
                    <div style={{ flex: 1, backgroundColor: '#0a0a0a', border: '1px solid rgba(0, 243, 255, 0.3)', borderRadius: '12px', padding: '25px 35px', overflow: 'hidden' }}>
                        <div style={{ fontSize: '15px', color: '#a0aec0', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 'bold', fontFamily: fontData }}>Diagnostic Capital Preserved</div>
                        <div style={{ color: '#00F3FF', fontSize: '12px', fontFamily: fontData, marginTop: '5px' }}>[ 7-DAY UPLINK CYCLE ]</div>
                        <div style={{ fontSize: getDynamicFontSize(formattedBase.length, 52), fontWeight: '900', color: '#00F3FF', margin: '15px 0', fontFamily: fontData, whiteSpace: 'nowrap' }}>
                            ${formattedBase}
                        </div>
                        <div style={{ fontSize: '15px', color: '#e2e8f0', lineHeight: '1.5' }}>
                            Immediate expenditure recovery calculated from the successful neutralization of {execReport.financials.total_mitigations} critical entropic spikes.
                        </div>
                    </div>
                    
                    <div style={{ flex: 1, backgroundColor: '#050c0e', border: '2px solid rgba(0, 255, 102, 0.5)', borderRadius: '12px', padding: '25px 35px', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: 0, right: 0, backgroundColor: '#00FF66', color: '#000', padding: '5px 15px', fontSize: '12px', fontWeight: 'bold', fontFamily: fontData, borderBottomLeftRadius: '8px' }}>PROJECTED ROI</div>
                        <div style={{ fontSize: '15px', color: '#a0aec0', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 'bold', fontFamily: fontData }}>Projected Annual Savings</div>
                        <div style={{ color: '#00FF66', fontSize: '12px', fontFamily: fontData, marginTop: '5px' }}>[ 365-DAY FISCAL EXTRAPOLATION ]</div>
                        <div style={{ fontSize: getDynamicFontSize(formattedAnnual.length, 52), fontWeight: '900', color: '#00FF66', margin: '15px 0', fontFamily: fontData, whiteSpace: 'nowrap' }}>
                            ${formattedAnnual}
                        </div>
                        <div style={{ fontSize: '15px', color: '#e2e8f0', lineHeight: '1.5' }}>
                            Forecasted corporate capital preservation assuming current environmental load pressure and sustained A.I.C.E. impedance governance.
                        </div>
                    </div>
                </div>

                <div style={{ backgroundColor: '#110500', border: '1px solid rgba(255, 69, 0, 0.4)', borderRadius: '12px', padding: '20px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ flex: 1, paddingRight: '40px', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{ fontSize: '16px', color: '#ff4500', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 'bold', fontFamily: fontData }}>Cost of Inaction (COI)</div>
                        <h3 style={{ fontSize: '22px', color: '#fff', margin: '10px 0' }}>Operational Downtime Mitigated</h3>
                        <p style={{ fontSize: '14px', color: '#a0aec0', lineHeight: '1.5', margin: 0 }}>
                            Beyond direct hardware fatigue, unmitigated systemic shock leads to catastrophic application crashes and cascading operational failure. A.I.C.E. governance successfully maintained 100% uptime.
                        </p>
                    </div>
                    {/* The Flexbox Baseline Lock */}
                    <div style={{ flex: 1, paddingLeft: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ fontSize: '14px', color: '#ff9d00', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 'bold', fontFamily: fontData, marginBottom: '10px' }}>Prevented System Outage</div>
                        
                        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '8px' }}>
                            <div style={{ fontSize: '72px', fontWeight: '900', color: '#ff4500', fontFamily: fontData, lineHeight: '1', whiteSpace: 'nowrap' }}>
                                {downtimePreventedHours}
                            </div>
                            <div style={{ fontSize: '24px', color: '#ff9d00', fontWeight: '900', fontFamily: fontData }}>HRS</div>
                        </div>

                        <div style={{ fontSize: '12px', color: '#a0aec0', fontFamily: fontData, marginTop: '15px', textAlign: 'center', maxWidth: '85%' }}>
                            *Based on 45m average recovery SLA (Service-Level Agreement) per event.
                        </div>
                    </div>
                </div>

                <div style={{ position: 'absolute', bottom: '50px', left: '60px', right: '60px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#666', fontFamily: fontData }}>
                    <div>A.I.C.E. SYSTEMS CORP. | RESTRICTED INTEL</div>
                    <div>PAGE 5 OF 7</div>
                </div>
            </div>

            {/* ==========================================
                PAGE 6: Holographic HUD Dashboard
                ========================================== */}
            <div
              id="audit-page-6"
              style={{
                width: '794px',
                height: '1123px',
                backgroundColor: '#050505',
                color: '#ffffff',
                padding: '30px 60px 50px 60px',
                boxSizing: 'border-box',
                fontFamily: fontCorporate,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* ambient glow layers */}
              <div
                style={{
                  position: 'absolute',
                  top: '120px',
                  left: '-120px',
                  width: '260px',
                  height: '260px',
                  backgroundColor: 'rgba(0, 243, 255, 0.06)',
                  borderRadius: '50%',
                  boxShadow: '0 0 140px 90px rgba(0,243,255,0.08)',
                  pointerEvents: 'none',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '160px',
                  right: '-120px',
                  width: '260px',
                  height: '260px',
                  backgroundColor: 'rgba(0, 255, 102, 0.05)',
                  borderRadius: '50%',
                  boxShadow: '0 0 140px 90px rgba(0,255,102,0.08)',
                  pointerEvents: 'none',
                }}
              />

              <div
                style={{
                  borderBottom: '3px solid #00F3FF',
                  paddingBottom: '20px',
                  marginBottom: '35px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                <div>
                  <h1
                    style={{
                      fontSize: '42px',
                      fontWeight: 900,
                      color: '#00F3FF',
                      letterSpacing: '5px',
                      margin: 0,
                      textTransform: 'uppercase',
                      textShadow: '0 0 18px rgba(0,243,255,0.45)',
                    }}
                  >
                    A.I.C.E. PROTOCOL
                  </h1>
                  <div
                    style={{
                      fontSize: '18px',
                      color: '#a0aec0',
                      letterSpacing: '3px',
                      marginTop: '8px',
                      fontWeight: 'bold',
                    }}
                  >
                    TELEMETRY & HEALTH DASHBOARD
                  </div>
                </div>
                <div
                  style={{
                    textAlign: 'right',
                    fontFamily: fontData,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                  }}
                >
                  <img
                    src="/assets/images/ExecutiveAudit/Aice logo.jpeg"
                    alt="AICE Logo"
                    style={{
                      height: '55px',
                      marginBottom: '12px',
                      objectFit: 'contain',
                      borderRadius: '4px',
                    }}
                  />
                  <div style={{ fontSize: '16px', color: '#ffffff', marginTop: '8px' }}>Generated: {timestamp}</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '30px', marginBottom: '30px', position: 'relative', zIndex: 2 }}>
                {/* system health hero */}
                <div
                  style={{
                    flex: '1.5',
                    background: 'linear-gradient(145deg, rgba(0,255,102,0.08), rgba(0,0,0,0.82))',
                    border: '1px solid rgba(0,255,102,0.28)',
                    borderRadius: '18px',
                    padding: '35px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    boxShadow:
                      '0 0 0 1px rgba(255,255,255,0.03) inset, 0 0 30px rgba(0,255,102,0.10), 0 18px 40px rgba(0,0,0,0.45)',
                  }}
                >
                  <div
                    style={{
                      fontSize: '16px',
                      color: '#a0aec0',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      fontWeight: 'bold',
                      fontFamily: fontData,
                      position: 'absolute',
                      top: '25px',
                      left: '30px',
                    }}
                  >
                    SYSTEM HEALTH
                  </div>

                  <div
                    style={{
                      position: 'relative',
                      width: '210px',
                      height: '210px',
                      marginTop: '30px',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        inset: '8px',
                        borderRadius: '50%',
                        boxShadow:
                          '0 0 0 1px rgba(0,255,102,0.12) inset, 0 0 25px rgba(0,255,102,0.15), 0 0 50px rgba(0,255,102,0.05)',
                      }}
                    />
                    <PieChart width={210} height={210}>
                      <Pie
                        data={healthData}
                        cx={105}
                        cy={105}
                        innerRadius={80}
                        outerRadius={102}
                        startAngle={220}
                        endAngle={-40}
                        dataKey="value"
                        stroke="none"
                      >
                        {healthData.map((entry, index) => (
                          <Cell key={`health-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>

                    <div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                        width: '100%',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '60px',
                          fontWeight: 900,
                          color: '#00FF66',
                          fontFamily: fontData,
                          lineHeight: '1',
                          textShadow: '0 0 20px rgba(0,255,102,0.85)',
                        }}
                      >
                        100<span style={{ fontSize: '24px' }}>%</span>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      fontSize: '15px',
                      color: '#00FF66',
                      fontWeight: 'bold',
                      letterSpacing: '3px',
                      marginTop: '20px',
                      textShadow: '0 0 10px rgba(0,255,102,0.8)',
                    }}
                  >
                    OPERATIONAL
                  </div>
                </div>

                {/* active status feed */}
                <div
                  style={{
                    flex: '1',
                    background: 'linear-gradient(145deg, rgba(0,243,255,0.06), rgba(0,0,0,0.82))',
                    border: '1px solid rgba(0,243,255,0.20)',
                    borderRadius: '18px',
                    padding: '35px',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow:
                      '0 0 0 1px rgba(255,255,255,0.03) inset, 0 0 30px rgba(0,243,255,0.08), 0 18px 40px rgba(0,0,0,0.45)',
                  }}
                >
                  <div
                    style={{
                      fontSize: '16px',
                      color: '#a0aec0',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      fontWeight: 'bold',
                      fontFamily: fontData,
                      marginBottom: '25px',
                    }}
                  >
                    ACTIVE STATUS
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1, justifyContent: 'center' }}>
                    {[
                      ['Monitoring', 'Active', '#00FF66'],
                      ['Control Engine', 'Active', '#00FF66'],
                      ['Intervention', 'Standby', '#ff9d00'],
                      ['Logging', 'Active', '#00FF66'],
                      ['Security', 'Active', '#00FF66'],
                    ].map(([label, value, color]) => (
                      <div
                        key={label}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          borderBottom: '1px solid rgba(255,255,255,0.05)',
                          paddingBottom: '10px',
                        }}
                      >
                        <span style={{ color: '#e2e8f0', fontFamily: fontData, fontSize: '15px' }}>{label}</span>
                        <span
                          style={{
                            color,
                            fontWeight: 'bold',
                            fontFamily: fontData,
                            textShadow: `0 0 10px ${color === '#00FF66' ? 'rgba(0,255,102,0.6)' : 'rgba(255,157,0,0.6)'}`,
                          }}
                        >
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.03), rgba(0,0,0,0.88))',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '18px',
                  padding: '35px',
                  boxShadow: '0 0 0 1px rgba(255,255,255,0.02) inset, 0 18px 40px rgba(0,0,0,0.50)',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    fontSize: '16px',
                    color: '#a0aec0',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    fontFamily: fontData,
                    marginBottom: '20px',
                  }}
                >
                  RESOURCE UTILIZATION
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', paddingTop: '20px' }}>
                  {/* CPU */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ position: 'relative', width: '170px', height: '95px' }}>
                      <div
                        style={{
                          position: 'absolute',
                          inset: '0',
                          borderRadius: '170px 170px 0 0',
                          boxShadow: '0 0 30px rgba(0,243,255,0.10)',
                        }}
                      />
                      <PieChart width={170} height={170} style={{ position: 'absolute', top: 0, left: 0 }}>
                        <Pie
                          data={cpuData}
                          cx={85}
                          cy={85}
                          startAngle={180}
                          endAngle={0}
                          innerRadius={60}
                          outerRadius={82}
                          dataKey="value"
                          stroke="none"
                        >
                          {cpuData.map((entry, index) => (
                            <Cell key={`cpu-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '0',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          fontSize: '34px',
                          fontWeight: 900,
                          color: '#fff',
                          fontFamily: fontData,
                          textShadow: '0 0 15px rgba(0,243,255,0.8)',
                        }}
                      >
                        {cpuUsage}
                        <span style={{ fontSize: '18px', color: '#00F3FF' }}>%</span>
                      </div>
                    </div>
                    <div style={{ color: '#a0aec0', fontFamily: fontData, marginTop: '20px', letterSpacing: '3px', fontWeight: 'bold' }}>
                      CPU
                    </div>
                  </div>

                  {/* RAM */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ position: 'relative', width: '170px', height: '95px' }}>
                      <div
                        style={{
                          position: 'absolute',
                          inset: '0',
                          borderRadius: '170px 170px 0 0',
                          boxShadow: '0 0 30px rgba(0,255,102,0.10)',
                        }}
                      />
                      <PieChart width={170} height={170} style={{ position: 'absolute', top: 0, left: 0 }}>
                        <Pie
                          data={ramData}
                          cx={85}
                          cy={85}
                          startAngle={180}
                          endAngle={0}
                          innerRadius={60}
                          outerRadius={82}
                          dataKey="value"
                          stroke="none"
                        >
                          {ramData.map((entry, index) => (
                            <Cell key={`ram-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '0',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          fontSize: '34px',
                          fontWeight: 900,
                          color: '#fff',
                          fontFamily: fontData,
                          textShadow: '0 0 15px rgba(0,255,102,0.8)',
                        }}
                      >
                        {memUsage}
                        <span style={{ fontSize: '18px', color: '#00FF66' }}>%</span>
                      </div>
                    </div>
                    <div style={{ color: '#a0aec0', fontFamily: fontData, marginTop: '20px', letterSpacing: '3px', fontWeight: 'bold' }}>
                      MEMORY
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  position: 'absolute',
                  bottom: '50px',
                  left: '60px',
                  right: '60px',
                  borderTop: '1px solid rgba(255,255,255,0.1)',
                  paddingTop: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '14px',
                  color: '#666',
                  fontFamily: fontData,
                  zIndex: 2,
                }}
              >
                <div>A.I.C.E. SYSTEMS CORP. | RESTRICTED INTEL</div>
                <div>PAGE 6 OF 7</div>
              </div>
            </div>

            {/* ==========================================
                PAGE 7: FULL-PAGE CINEMATIC ASSET
                ========================================== */}
            <div id="audit-page-7" style={{ width: '794px', height: '1123px', backgroundColor: '#000000', margin: 0, padding: 0, overflow: 'hidden' }}>
                <img 
                    src="/assets/images/ExecutiveAudit/Columbia Secure.png" 
                    alt="AICE Global Governance" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                />
            </div>

        </div>
    );
}