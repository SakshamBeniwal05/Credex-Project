const How_It_Works = () => {

  const working = [
    { logo: "/pencil.png", title: "Input Tools", description: "Easily connect your current Al tools, team members, and primary usage details." },
    { logo: "/maginying.png", title: "Analyze Spend", description: "The platform performs a deep analysis against an Al pricing database." },
    { logo: "idea.png", title: "Get Recommendations", description: "Receive a spend health score and actionable insights for cost savings." }
  ]

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-center items-center text-4xl font-medium">How It Works</div>
      <div className=" flex gap-10 justify-center lg:flex-row flex-col"> 
        {working.map((e) => {
          return (
            <div className=" bg-[#FBF3CE] p-8 w-80 h-72 rounded-2xl flex flex-col gap-2 justify-center">
              <div>
                <img className="bg-transparent h-20" src={e.logo} />
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-xl font-bold">{e.title}</div>
                <div className="text-lg font-medium">{e.description}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default How_It_Works