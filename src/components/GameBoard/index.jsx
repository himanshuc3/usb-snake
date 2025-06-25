
import React from "react"
import { Flex } from "antd"
import { useState } from "react"
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import "./index.scss"

export default function GameBoard() {
  const [display, setDisplay] = useState("READY")
  const [lastPressed, setLastPressed] = useState("")

  const handleButtonPress = (button) => {
    setLastPressed(button)
    setDisplay(`${button} PRESSED`)

    // Reset display after 1 second
    setTimeout(() => {
      setDisplay("READY")
      setLastPressed("")
    }, 1000)
  }

  const ButtonComponent = ({
    children,
    onClick,
    className = "",
    label,
  }) => (
    <button
      onClick={onClick}
      className={`
        bg-slate-800 hover:bg-slate-700 active:bg-slate-900 
        text-yellow-400 font-bold rounded-lg shadow-lg
        transition-all duration-150 ease-in-out
        active:scale-95 active:shadow-inner
        border-2 border-slate-900
        ${className}
      `}
      aria-label={label}
    >
      {children}
    </button>
  )

  return (
    <Flex vertical justify="center" align="center" gap={10} className="root-container">
      <Flex align="center" justify="space-between" className="header-container">
        <Flex>USB</Flex>
        <Flex>133 points</Flex>
      </Flex>
      <Flex className="game-board-container">
        Game Board
      </Flex>
      <Flex>
        Footer
      </Flex>
    </Flex>
    // <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
    //   <div className="bg-yellow-400 p-8 rounded-3xl shadow-2xl border-4 border-slate-900 max-w-2xl w-full">
    //     {/* Screen Area */}
    //     <div className="bg-slate-700 p-6 rounded-2xl mb-8 border-4 border-slate-900">
    //       <div className="bg-slate-600 p-4 rounded-lg border-2 border-slate-800">
    //         <div className="bg-slate-500 h-16 rounded flex items-center justify-center border border-slate-400">
    //           <span className="text-slate-900 font-mono text-lg font-bold tracking-wider">{display}</span>
    //         </div>
    //       </div>
    //     </div>

    //     {/* Controls Layout */}
    //     <div className="grid grid-cols-3 gap-8 items-center">
    //       {/* D-Pad */}
    //       <div className="flex justify-center">
    //         <div className="relative">
    //           <div className="grid grid-cols-3 grid-rows-3 gap-1 w-32 h-32">
    //             {/* Top */}
    //             <div></div>
    //             <ButtonComponent
    //               onClick={() => handleButtonPress("UP")}
    //               className="w-10 h-10 flex items-center justify-center"
    //               label="Up"
    //             >
    //               <ChevronUp size={20} />
    //             </ButtonComponent>
    //             <div></div>

    //             {/* Middle Row */}
    //             <ButtonComponent
    //               onClick={() => handleButtonPress("LEFT")}
    //               className="w-10 h-10 flex items-center justify-center"
    //               label="Left"
    //             >
    //               <ChevronLeft size={20} />
    //             </ButtonComponent>
    //             <div className="w-10 h-10 bg-yellow-500 rounded-full border-2 border-slate-900"></div>
    //             <ButtonComponent
    //               onClick={() => handleButtonPress("RIGHT")}
    //               className="w-10 h-10 flex items-center justify-center"
    //               label="Right"
    //             >
    //               <ChevronRight size={20} />
    //             </ButtonComponent>

    //             {/* Bottom */}
    //             <div></div>
    //             <ButtonComponent
    //               onClick={() => handleButtonPress("DOWN")}
    //               className="w-10 h-10 flex items-center justify-center"
    //               label="Down"
    //             >
    //               <ChevronDown size={20} />
    //             </ButtonComponent>
    //             <div></div>
    //           </div>
    //         </div>
    //       </div>

    //       {/* Analog Stick */}
    //       <div className="flex justify-center">
    //         <div className="relative">
    //           <div className="w-20 h-20 bg-yellow-500 rounded-full border-4 border-slate-900 shadow-inner flex items-center justify-center">
    //             <button
    //               onClick={() => handleButtonPress("STICK")}
    //               className="w-12 h-12 bg-slate-800 rounded-full border-2 border-slate-900 shadow-lg hover:bg-slate-700 active:bg-slate-900 transition-all duration-150 active:scale-95"
    //               aria-label="Analog Stick"
    //             ></button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    //     {/* Additional Control Buttons */}
    //     <div className="flex justify-center gap-4 mt-8">
    //       <ButtonComponent
    //         onClick={() => handleButtonPress("START")}
    //         className="px-6 py-2 text-sm"
    //         label="Start Button"
    //       >
    //         START
    //       </ButtonComponent>
    //       <ButtonComponent
    //         onClick={() => handleButtonPress("SELECT")}
    //         className="px-6 py-2 text-sm"
    //         label="Select Button"
    //       >
    //         SELECT
    //       </ButtonComponent>
    //     </div>
    //   </div>
    // </div>
  )
}
