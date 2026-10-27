import React from 'react';
import { FileCode } from 'lucide-react';

export const TeoNotesApp: React.FC = () => {
  return (
    <div className="space-y-4 font-mono text-xs text-retropurple-100">
      {/* Header */}
      <div className="bg-retropurple-900 border border-retropurple-500 p-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileCode className="w-4 h-4 text-retroyellow-pure" />
          <h2 className="text-sm font-pixel text-retroyellow-pure">
            TEO_NOTES.TXT // UNENCRYPTED RECOLLECTION
          </h2>
        </div>
        <span className="text-[10px] text-retropink-soft">
          RECOVERED FROM WORKBENCH 92nd AVE
        </span>
      </div>

      {/* Notepad Paper Styling */}
      <div className="bevel-inset bg-[#0a091d] p-4 font-mono text-xs text-retropurple-100 border border-retropurple-700 space-y-4 leading-relaxed">
        <div className="border-b border-retropurple-700 pb-2 text-[10px] text-retropurple-300">
          LAST MODIFIED: 21-OCT-199X 23:58 // AUTHOR: TEO WENOTI
        </div>

        <p className="text-retroyellow-cream italic text-xs leading-relaxed">
          “To whoever opens this disk after they bury me:
        </p>

        <p>
          Paul Boiler will stand before the cameras tomorrow on October 22nd. He will wear his tailored gray suit and announce the naming of the <span className="text-retroblue-cyan font-bold">‘Wenoti Arcade on 92nd Avenue’</span>. He will call me a ‘valued colleague’ and a ‘game development enthusiast on the side.’
        </p>

        <p>
          He will not mention that he stripped my name from the electrical grid patents. He will not mention that he diverted the department’s emergency generators to fuel his own bureaucratic career, while my designs were left to rot in basements.
        </p>

        <p className="text-white">
          Matters are now in my hands.
        </p>

        <div className="p-3 bg-retropurple-900/80 border-l-4 border-retropink-neon text-xs space-y-2">
          <span className="font-pixel text-[10px] text-retropink-neon">
            THE ARCHITECTURE OF VENGEANCE:
          </span>
          <p className="text-retropink-soft leading-relaxed">
            I built <strong className="text-white">‘The Reckoning: Origins’</strong> to teach them what absence feels like. In the source code, I deleted the <code className="text-retrogreen-neon font-bold">Character</code> class completely. 
          </p>
          <p className="text-retropurple-100 leading-relaxed">
            A game engine cannot compile without a player object. So when Boiler sneaks into the arcade at night—and I know his arrogant curiosity, he will not be able to resist—the machine will consume him to fulfill the missing class pointer.
          </p>
          <p className="text-retroyellow-warm italic">
            “No character escaped from the game. Because they are the character now. I was not a good man, but I wasn't all bad either. It is simply vengeance for how the world treated me while I lived.”
          </p>
        </div>

        <div className="pt-2 text-[11px] text-retrogreen-neon font-pixel">
          SCHEMATIC: CABINET #01 &rarr; SUBSTATION 14B &rarr; CONTINUUM MATRIX
        </div>
      </div>
    </div>
  );
};
