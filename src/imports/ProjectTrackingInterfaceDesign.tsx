function Container() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-neutral-500 text-nowrap top-px tracking-[2.4px] uppercase whitespace-pre">Project</p>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Heading 1">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[30px] left-0 not-italic text-[24px] text-nowrap text-white top-0 tracking-[0.0703px] whitespace-pre">{`Brand Refresh & Website Redesign`}</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#a1a1a1] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Luna Coffee Co.</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[86px] items-start left-0 top-0 w-[732.664px]" data-name="Container">
      <Container />
      <Heading />
      <Container1 />
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[350.38px] not-italic text-[12px] text-neutral-500 text-nowrap text-right top-px tracking-[2.4px] translate-x-[-100%] uppercase whitespace-pre">Deadline</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[28px] left-[351.14px] not-italic text-[18px] text-nowrap text-right text-white top-0 tracking-[-0.4395px] translate-x-[-100%] whitespace-pre">Nov 30, 2025</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[56px] items-start left-[764.66px] top-0 w-[350.328px]" data-name="Container">
      <Container3 />
      <Container4 />
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[86px] relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Container5 />
    </div>
  );
}

function SwissHeader() {
  return (
    <div className="absolute box-border content-stretch flex flex-col h-[135px] items-start left-0 pb-px pt-[24px] px-[32px] top-0 w-[1179px]" data-name="SwissHeader">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-neutral-800 border-solid inset-0 pointer-events-none" />
      <Container6 />
    </div>
  );
}

function Container7() {
  return <div className="absolute h-[420px] left-0 top-0 w-[159.164px]" data-name="Container" />;
}

function Container8() {
  return (
    <div className="absolute h-[16px] left-0 top-0 w-[923.836px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-neutral-500 text-nowrap top-px tracking-[2.4px] uppercase whitespace-pre">Current Stage</p>
    </div>
  );
}

function Heading1() {
  return (
    <div className="absolute h-[115.195px] left-0 top-[48px] w-[923.836px]" data-name="Heading 2">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[115.2px] left-0 not-italic text-[128px] text-nowrap text-white top-[2px] tracking-[-3.2px] whitespace-pre">Client Revisions</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[32.5px] left-0 top-[211.19px] w-[672px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[32.5px] left-0 not-italic text-[#a1a1a1] text-[20px] text-nowrap top-[-0.5px] tracking-[-0.4492px] whitespace-pre">Incorporating client feedback on homepage and product page layouts</p>
    </div>
  );
}

function Container9() {
  return <div className="absolute bg-white left-0 opacity-[0.668] rounded-[1.67772e+07px] size-[8px] top-[4px]" data-name="Container" />;
}

function Text() {
  return (
    <div className="absolute h-[16px] left-[20px] top-0 w-[105.859px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-neutral-500 text-nowrap top-px tracking-[2.4px] uppercase whitespace-pre">In Progress</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute h-[16px] left-0 top-[307.69px] w-[125.859px]" data-name="Container">
      <Container9 />
      <Text />
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute h-[420px] left-[191.16px] top-0 w-[923.836px]" data-name="Container">
      <Container8 />
      <Heading1 />
      <Paragraph />
      <Container10 />
    </div>
  );
}

function SwissStageDisplay() {
  return (
    <div className="absolute h-[420px] left-[32px] top-[231px] w-[1115px]" data-name="SwissStageDisplay">
      <Container7 />
      <Container11 />
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute h-[16px] left-0 top-0 w-[159.164px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-neutral-500 text-nowrap top-px tracking-[2.4px] uppercase whitespace-pre">Next Steps</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute h-[32px] left-0 top-0 w-[48px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[32px] left-0 not-italic text-[24px] text-neutral-700 text-nowrap top-0 tracking-[0.0703px] whitespace-pre">01</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute h-[29.25px] left-[72px] top-[4px] w-[696px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[29.25px] left-0 not-italic text-[18px] text-nowrap text-white top-[0.5px] tracking-[-0.4395px] whitespace-pre">Adjust hero section typography per client feedback</p>
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[33.25px] relative shrink-0 w-full" data-name="Container">
      <Container13 />
      <Container14 />
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute h-[32px] left-0 top-0 w-[48px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[32px] left-0 not-italic text-[24px] text-neutral-700 text-nowrap top-0 tracking-[0.0703px] whitespace-pre">02</p>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute h-[29.25px] left-[72px] top-[4px] w-[696px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[29.25px] left-0 not-italic text-[18px] text-nowrap text-white top-[0.5px] tracking-[-0.4395px] whitespace-pre">Revise product grid layout with larger imagery</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[33.25px] relative shrink-0 w-full" data-name="Container">
      <Container16 />
      <Container17 />
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute h-[32px] left-0 top-0 w-[48px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[32px] left-0 not-italic text-[24px] text-neutral-700 text-nowrap top-0 tracking-[0.0703px] whitespace-pre">03</p>
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute h-[29.25px] left-[72px] top-[4px] w-[696px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[29.25px] left-0 not-italic text-[18px] text-nowrap text-white top-[0.5px] tracking-[-0.4395px] whitespace-pre">Send updated mockups for final approval</p>
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[33.25px] relative shrink-0 w-full" data-name="Container">
      <Container19 />
      <Container20 />
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[147.75px] items-start left-[191.16px] top-0 w-[768px]" data-name="Container">
      <Container15 />
      <Container18 />
      <Container21 />
    </div>
  );
}

function Container23() {
  return (
    <div className="h-[147.75px] relative shrink-0 w-full" data-name="Container">
      <Container12 />
      <Container22 />
    </div>
  );
}

function SwissNextSteps() {
  return (
    <div className="absolute box-border content-stretch flex flex-col h-[276.75px] items-start left-0 pb-0 pt-[65px] px-[32px] top-[747px] w-[1179px]" data-name="SwissNextSteps">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-neutral-800 border-solid inset-0 pointer-events-none" />
      <Container23 />
    </div>
  );
}

function App() {
  return (
    <div className="absolute bg-black h-[1023.75px] left-0 top-0 w-[1179px]" data-name="App">
      <SwissHeader />
      <SwissStageDisplay />
      <SwissNextSteps />
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-neutral-500 text-nowrap top-px tracking-[2.4px] uppercase whitespace-pre">Stage</p>
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[96px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[96px] left-0 not-italic text-[96px] text-nowrap text-white top-px whitespace-pre">3</p>
    </div>
  );
}

function Container26() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[28px] left-0 not-italic text-[20px] text-neutral-600 top-0 tracking-[-0.4492px] w-[23px]">/ 5</p>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[164px] items-start relative shrink-0 w-full" data-name="Container">
      <Container24 />
      <Container25 />
      <Container26 />
    </div>
  );
}

function Container28() {
  return (
    <div className="bg-white h-[32px] relative shrink-0 w-[4px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] w-[4px]" />
    </div>
  );
}

function Container29() {
  return (
    <div className="h-[16px] relative shrink-0 w-[73.234px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[73.234px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-neutral-500 text-nowrap top-px tracking-[0.6px] uppercase whitespace-pre">Discovery</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex gap-[12px] h-[32px] items-center relative shrink-0 w-full" data-name="Container">
      <Container28 />
      <Container29 />
    </div>
  );
}

function Container31() {
  return (
    <div className="bg-white h-[32px] relative shrink-0 w-[4px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] w-[4px]" />
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[16px] relative shrink-0 w-[97.414px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[97.414px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-neutral-500 text-nowrap top-px tracking-[0.6px] uppercase whitespace-pre">Initial Design</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex gap-[12px] h-[32px] items-center relative shrink-0 w-full" data-name="Container">
      <Container31 />
      <Container32 />
    </div>
  );
}

function Container34() {
  return (
    <div className="bg-[#a1a1a1] h-[32px] relative shrink-0 w-[4px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] w-[4px]" />
    </div>
  );
}

function Container35() {
  return (
    <div className="h-[16px] relative shrink-0 w-[118.211px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[118.211px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-nowrap text-white top-px tracking-[0.6px] uppercase whitespace-pre">Client Revisions</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex gap-[12px] h-[32px] items-center relative shrink-0 w-full" data-name="Container">
      <Container34 />
      <Container35 />
    </div>
  );
}

function Container37() {
  return (
    <div className="bg-neutral-800 h-[32px] relative shrink-0 w-[4px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] w-[4px]" />
    </div>
  );
}

function Container38() {
  return (
    <div className="h-[16px] relative shrink-0 w-[95.195px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[95.195px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-neutral-700 text-nowrap top-px tracking-[0.6px] uppercase whitespace-pre">Development</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex gap-[12px] h-[32px] items-center relative shrink-0 w-full" data-name="Container">
      <Container37 />
      <Container38 />
    </div>
  );
}

function Container40() {
  return (
    <div className="bg-neutral-800 h-[32px] relative shrink-0 w-[4px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] w-[4px]" />
    </div>
  );
}

function Container41() {
  return (
    <div className="h-[16px] relative shrink-0 w-[53.578px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[53.578px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-neutral-700 text-nowrap top-px tracking-[0.6px] uppercase whitespace-pre">Launch</p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex gap-[12px] h-[32px] items-center relative shrink-0 w-full" data-name="Container">
      <Container40 />
      <Container41 />
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[208px] items-start relative shrink-0 w-full" data-name="Container">
      <Container30 />
      <Container33 />
      <Container36 />
      <Container39 />
      <Container42 />
    </div>
  );
}

function SwissStageDisplay1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[48px] h-[420px] items-start left-[32px] top-[231px] w-[159.164px]" data-name="SwissStageDisplay">
      <Container27 />
      <Container43 />
    </div>
  );
}

export default function ProjectTrackingInterfaceDesign() {
  return (
    <div className="bg-white relative size-full" data-name="Project Tracking Interface Design">
      <App />
      <SwissStageDisplay1 />
    </div>
  );
}