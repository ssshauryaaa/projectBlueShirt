import React, { useState } from 'react';
import { soundFX } from '../../services/sound';
import { UserCheck, AlertTriangle, ShieldCheck, Gamepad2, Clock } from 'lucide-react';

interface CaseAppProps {
  onOpenReckoning?: () => void;
}

export const CaseApp: React.FC<CaseAppProps> = ({ onOpenReckoning }) => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'boiler' | 'wenoti' | 'agents'>('timeline');

  const switchTab = (tab: 'timeline' | 'boiler' | 'wenoti' | 'agents') => {
    soundFX.playClick();
    setActiveTab(tab);
  };

  return (
    <div className="space-y-4 font-mono text-xs text-retropurple-100">
      {/* Dossier Header */}
      <div className="bg-retropurple-900 border border-retropurple-500 p-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-retropink-neon text-black font-pixel text-[9px] px-1.5 py-0.5">
              EXUN-TOP-SECRET
            </span>
            <h2 className="text-sm font-pixel text-retroblue-cyan">
              CASE.EXE // DOSSIER 92-WENOTI
            </h2>
          </div>
          <p className="text-[11px] text-retropurple-100/80 mt-1">
            Department of Extradigital Exceptions and Unknowns Network • NuxEland Jurisdiction
          </p>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-retroyellow-cream">
            CLASSIFICATION: COLD VECTOR
          </div>
          <div className="text-[10px] text-retrogreen-neon font-pixel">
            DATE: 23-OCT-199X
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-retropurple-500 gap-1 select-none">
        <button
          onClick={() => switchTab('timeline')}
          className={`px-3 py-1.5 text-xs font-pixel flex items-center gap-1.5 bevel-button ${
            activeTab === 'timeline'
              ? 'bg-retroblue-teal text-black font-bold'
              : 'bg-retropurple-700 text-retropurple-100 hover:bg-retropurple-500'
          }`}
        >
          <Clock className="w-3 h-3" />
          INCIDENT TIMELINE
        </button>
        <button
          onClick={() => switchTab('boiler')}
          className={`px-3 py-1.5 text-xs font-pixel flex items-center gap-1.5 bevel-button ${
            activeTab === 'boiler'
              ? 'bg-retroblue-teal text-black font-bold'
              : 'bg-retropurple-700 text-retropurple-100 hover:bg-retropurple-500'
          }`}
        >
          <UserCheck className="w-3 h-3" />
          PAUL BOILER
        </button>
        <button
          onClick={() => switchTab('wenoti')}
          className={`px-3 py-1.5 text-xs font-pixel flex items-center gap-1.5 bevel-button ${
            activeTab === 'wenoti'
              ? 'bg-retroblue-teal text-black font-bold'
              : 'bg-retropurple-700 text-retropurple-100 hover:bg-retropurple-500'
          }`}
        >
          <AlertTriangle className="w-3 h-3" />
          TEO WENOTI
        </button>
        <button
          onClick={() => switchTab('agents')}
          className={`px-3 py-1.5 text-xs font-pixel flex items-center gap-1.5 bevel-button ${
            activeTab === 'agents'
              ? 'bg-retroblue-teal text-black font-bold'
              : 'bg-retropurple-700 text-retropurple-100 hover:bg-retropurple-500'
          }`}
        >
          <ShieldCheck className="w-3 h-3" />
          AGENTS NANO & MEGA
        </button>
      </div>

      {/* Tab Contents */}
      <div className="bevel-inset bg-black/50 p-4 min-h-[280px]">
        {activeTab === 'timeline' && (
          <>
            <div className="flex gap-3 overflow-x-auto pb-1">
              <div className="border-l-2 border-retroblue-cyan pl-3 py-1 space-y-1 min-w-[170px] flex-1">
                <span className="text-[10px] font-pixel text-retroyellow-bright block">
                  [22 OCT - 18:00] THE GLITCHED BROADCAST
                </span>
                <p className="text-xs text-retropurple-100 leading-relaxed">
                  A dark television flashes and glitches before locking onto a government address. Paul Boiler, high-ranking bureaucrat in the NuxEland Electricity Department, stiffly delivers condolences for colleague Teo Wenoti and dedicates the &ldquo;Wenoti Arcade on 92nd Avenue.&rdquo; Boiler looks cold and nervous, hiding critical intel.
                </p>
              </div>

              <div className="border-l-2 border-retropink-neon pl-3 py-1 space-y-1 min-w-[170px] flex-1">
                <span className="text-[10px] font-pixel text-retropink-rose block">
                  [22 OCT - 23:30] UNDERCOVER INFILTRATION
                </span>
                <p className="text-xs text-retropurple-100 leading-relaxed">
                  Obsessed with the mystery of Wenoti&rsquo;s favourite game <em className="text-white">&lsquo;The Reckoning: Origins&rsquo;</em>, Boiler sneaks into the closed arcade dressed in elven cosplay (leather glove, scabbard, bright blue shirt). Unknown to him, rookie EXUN agents Nano &amp; Mega are tracking the location.
                </p>
              </div>

              <div className="border-l-2 border-retrogreen-neon pl-3 py-1 space-y-1 min-w-[170px] flex-1">
                <span className="text-[10px] font-pixel text-retrogreen-neon block">
                  [23 OCT - 01:14] THE MACHINE WARBLES &amp; LIGHT BURSTS
                </span>
                <p className="text-xs text-retropurple-100 leading-relaxed">
                  Agent Nano confronts Boiler at the machine. Boiler panics, puts on an atrocious fake accent, stares at his bare wrist, and tries to flee. The cabinet reverberates violently with sparks and blinding white light. City-wide electricity surges occur. Boiler and Agent Mega are pulled into the screen.
                </p>
              </div>

              <div className="border-l-2 border-retroyellow-pure pl-3 py-1 space-y-1 min-w-[170px] flex-1">
                <span className="text-[10px] font-pixel text-retroyellow-pure block">
                  [23 OCT - 03:00] CURRENT SITUATION: THE DIGITAL HELLSCAPE
                </span>
                <p className="text-xs text-retropurple-100 leading-relaxed">
                  Boiler and Mega are trapped inside the rogue developer&rsquo;s code. The missing <code className="text-retrogreen-neon font-bold">Character</code> class was a trap: players are forced to populate the void. The game screen asks: <strong className="text-retropink-neon">&ldquo;Continue the game?..&rdquo;</strong> with a ticking countdown.
                </p>
              </div>
            </div>

            {/* Step Into The World CTA */}
            <div className="mt-4 border-2 border-retropink-neon/60 bg-retropink-neon/10 p-3.5 bevel-inset flex flex-col sm:flex-row items-center justify-between gap-3 shadow-[0_0_15px_rgba(255,0,170,0.2)]">
              <div className="flex items-start gap-3">
                <Gamepad2 className="w-5 h-5 text-retropink-neon flex-shrink-0 mt-0.5 animate-bounce" />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-pixel text-[10px] text-retroyellow-bright">⚠ ACCESS POINT DETECTED</p>
                    <span className="bg-retrogreen-neon text-black font-pixel text-[8px] px-1 py-0.2">PLAYABLE</span>
                  </div>
                  <p className="text-[11px] text-retropurple-100 leading-relaxed mt-0.5">
                    Step into the world by playing a small minigame &mdash; dive into <em className="text-retropink-neon font-bold">The Reckoning: Origins</em> inside Machine #92 to uncover what Paul Boiler was chasing.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  soundFX.playClick();
                  onOpenReckoning?.();
                }}
                className="flex-shrink-0 flex items-center gap-2 px-4 py-2 font-pixel text-[11px] bg-retropink-neon text-black bevel-button hover:bg-retropink-rose active:scale-95 transition-all shadow-[0_0_15px_#FF00AA] animate-pulse cursor-pointer hover:shadow-[0_0_24px_#FF00AA]"
              >
                <Gamepad2 className="w-3.5 h-3.5 animate-spin" />
                PLAY MINIGAME
              </button>
            </div>
          </>
        )}

        {activeTab === 'boiler' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="w-24 h-28 bg-retropurple-900 border border-retropink-neon flex flex-col items-center justify-center p-2 flex-shrink-0 text-center">
                <div className="w-12 h-12 rounded-full bg-retropurple-500 border border-retropurple-100 flex items-center justify-center font-pixel text-xs text-retroyellow-cream">
                  PB
                </div>
                <span className="font-pixel text-[8px] text-retropink-pastel mt-2">
                  PAUL BOILER
                </span>
                <span className="text-[7px] text-retropurple-100">BUREAUCRAT</span>
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="text-sm font-pixel text-retroyellow-bright">
                  SUBJECT PROFILE: PAUL BOILER
                </h3>
                <ul className="space-y-1.5 text-xs text-retropurple-100 list-disc list-inside">
                  <li><strong className="text-white">Role:</strong> Senior Official, Department of Electricity, Government of NuxEland.</li>
                  <li><strong className="text-white">Appearance:</strong> Cold, powerful, expressionless facade on camera. Looks like a man guarding profound secrets.</li>
                  <li><strong className="text-white">Secret Obsession:</strong> Thrill-seeker. Felt suffocated by bureaucratic life and took to covert cosplay to unlock Wenoti's game.</li>
                  <li><strong className="text-white">The Disguise:</strong> Elven protagonist from 'The Reckoning: Origins' featuring a leather glove, scabbard, and iconic blue shirt.</li>
                  <li><strong className="text-white">Tells:</strong> Puts on an exaggerated, unconvincing accent when cornered; frantically stares at his bare wrist when caught off guard.</li>
                </ul>
              </div>
            </div>
            <div className="bg-retropurple-900/60 p-2.5 border border-retroblue-teal text-[11px] text-retroblue-cyan">
              "He wanted the thrill of working undercover. Now he is living inside the very code he sought to exploit."
            </div>
          </div>
        )}

        {activeTab === 'wenoti' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="w-24 h-28 bg-retropurple-900 border border-retrogreen-neon flex flex-col items-center justify-center p-2 flex-shrink-0 text-center">
                <div className="w-12 h-12 rounded-full bg-[#159A4A] border border-retrogreen-bright flex items-center justify-center font-pixel text-xs text-black">
                  TW
                </div>
                <span className="font-pixel text-[8px] text-retrogreen-neon mt-2">
                  TEO WENOTI
                </span>
                <span className="text-[7px] text-retropurple-100">ARCHITECT</span>
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="text-sm font-pixel text-retrogreen-neon">
                  SUBJECT PROFILE: TEO WENOTI (DECEASED)
                </h3>
                <p className="text-xs text-retropurple-100 leading-relaxed">
                  Valued electrical department technician, planner of Wenoti Arcade, and clandestine rogue game developer. Teo felt betrayed and marginalized by the government apparatus.
                </p>
                <div className="p-2.5 bg-retropurple-900/80 border border-retropink-rose text-xs space-y-1">
                  <span className="font-pixel text-[9px] text-retropink-neon">
                    THE VENGEANCE CONSTRUCT:
                  </span>
                  <p className="text-[11px] text-retropink-soft">
                    Wenoti deleted the <code className="text-white font-bold">Character</code> class from the source code of <em className="text-retroyellow-cream">The Reckoning: Origins</em>. Without a player sprite, the machine consumes the organic consciousness of the player to act as the missing entity.
                  </p>
                  <p className="text-[10px] text-retropurple-100 italic">
                    "He was not a good man, but wasn't all bad either. It was vengeance for how the world treated him."
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'agents' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-retropurple-900/70 p-3 border border-retroblue-cyan">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 bg-retroblue-cyan rounded-full animate-ping" />
                  <h4 className="font-pixel text-xs text-retroblue-cyan">ROOKIE AGENT NANO</h4>
                </div>
                <p className="text-xs text-retropurple-100 leading-relaxed">
                  Field operative, Extradigital Exceptions and Unknowns Network. Confronted Boiler at the cabinet. Witnessed the blinding pure light. Escaped the machine’s pull with abrasions and disorientation. Currently facing a moral crossroad.
                </p>
                <div className="mt-2 text-[10px] text-retroyellow-warm bg-black/40 p-1 border border-retroyellow-bright">
                  STATUS: SURVIVED // MORAL DILEMMA ACTIVE
                </div>
              </div>

              <div className="bg-retropurple-900/70 p-3 border border-retropink-neon">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 bg-retropink-neon rounded-full" />
                  <h4 className="font-pixel text-xs text-retropink-neon">ROOKIE AGENT MEGA</h4>
                </div>
                <p className="text-xs text-retropurple-100 leading-relaxed">
                  Partner to Nano. Stylish, confident "man in black" undercover operative. When the machine began violently warbling, Mega attempted to seize Boiler, but was sucked into the digital abyss along with him.
                </p>
                <div className="mt-2 text-[10px] text-retropink-rose bg-black/40 p-1 border border-retropink-neon">
                  STATUS: M.I.A. INSIDE THE RECKONING ENGINE
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Alert */}
      <div className="flex items-center justify-between text-[10px] text-retropurple-100/70 pt-2 border-t border-retropurple-700">
        <span>AUTHORITY: EXUN HEADQUARTERS</span>
        <span className="text-retrogreen-neon font-pixel">CASE OPEN • THREAT LEVEL: METAPHYSICAL</span>
      </div>
    </div>
  );
};
