import AddBraveForm from "./add-brave";

export default function Navbar() {
  return (
    <div className="fixed !bottom-0 sm:!top-0 left-0 h-[75px] sm:h-[61px] w-full bg-transparent backdrop-blur-md px-2 sm:px-0 py-2 sm:py-0">
      <nav className="grid w-full auto-cols-fr grid-flow-col items-center justify-between rounded-2xl sm:rounded-none bg-blur-baseline backdrop-blur-[2.5rem] shadow-[0_4px_30px_rgba(0,0,0.1)] sm:shadow-none border-t sm:border-b border-border-subtlest-tertiary">
        <div className="relative flex h-full flex-col items-center justify-center py-2">
          <a className="flex flex-col items-center justify-center" href="#">
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7 pointer-events-none"
            >
              <path
                d="M13.378 3.57l7.077 6.168A1.853 1.853 0 0121 11v8a2 2 0 11-4 0v-3a2 2 0 00-1.85-1.995L15 14H9a2 2 0 00-1.995 1.85L7 16v3a2 2 0 11-4 0v-8a1.853 1.853 0 01.545-1.262l7.077-6.167a1.949 1.949 0 012.756 0z"
                fill="currentcolor"
                fillRule="evenodd"
              ></path>
            </svg>
            <span className="text-[10px]">Feed</span>
          </a>
        </div>
        <div className="relative flex h-full flex-col items-center justify-center py-2">
          <a
            className="flex flex-col items-center justify-center text-text-tertiary"
            href="#"
          >
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7 pointer-events-none"
            >
              <path
                d="M10 3.347c1.138 0 2.213.266 3.163.739-.255.462-.74.764-1.283.787l-.87.036A5.636 5.636 0 0010 4.818c-3.038 0-5.5 2.415-5.5 5.394 0 2.906 2.344 5.276 5.279 5.39l.221.004.221-.004c2.935-.114 5.279-2.484 5.279-5.39l-.003-.13.082-.215c.2-.524.676-.893 1.234-.967l.058-.005a6.771 6.771 0 01-.803 4.742 2.849 2.849 0 012.076.657l.157.143 1.872 1.836a2.731 2.731 0 010 3.916 2.864 2.864 0 01-3.852.13l-.14-.13-1.872-1.836a2.732 2.732 0 01-.818-2.19 7.062 7.062 0 01-3.491.914c-3.866 0-7-3.073-7-6.865 0-3.791 3.134-6.865 7-6.865zm5.37 12.13a1.28 1.28 0 00-.097 1.73l.096.106 1.872 1.836c.241.236.552.362.868.378h.135l.135-.013c.269-.04.527-.162.733-.365a1.28 1.28 0 00.097-1.73l-.097-.106-1.871-1.835a1.342 1.342 0 00-1.872 0zm.05-12.056l.044 1.013a2.493 2.493 0 001.648 2.225l.97.355c.457.167.35.83-.138.85l-1.033.044a2.592 2.592 0 00-.304.03l-.05.01c-.08.014-.159.032-.236.054l-.147.046-.18.07-.168.08-.113.063-.141.09-.164.121-.032.026c-.323.27-.579.62-.734 1.026l-.361.95a.43.43 0 01-.373.285h-.078l-.077-.012a.429.429 0 01-.34-.407l-.044-1.014a2.493 2.493 0 00-1.648-2.224l-.97-.355c-.457-.167-.35-.83.138-.85l1.034-.044c.3-.013.588-.077.855-.185l.109-.048c.175-.08.34-.178.49-.294l.148-.122.12-.114.136-.152.045-.056.078-.104.055-.082-.03.046a2.47 2.47 0 00.262-.505l.362-.95c.17-.45.846-.345.867.134z"
                fill="currentcolor"
                fillRule="evenodd"
              ></path>
            </svg>
            <span className="text-[10px]">Explore</span>
          </a>
        </div>
        <AddBraveForm />
        <div className="relative flex h-full flex-col items-center justify-center py-2">
          <a
            className="flex flex-col items-center justify-center text-text-tertiary"
            href="#"
          >
            <div className="relative">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 pointer-events-none"
              >
                <path
                  d="M12 3a2.312 2.312 0 012.25 2.847 6.39 6.39 0 014.106 5.491l.015.264.004.21v2.226l.072.022c.803.28 1.405.988 1.53 1.852l.018.175.005.158c0 1.224-.95 2.226-2.154 2.307l-.159.006-2.046-.001-.013.033a3.94 3.94 0 01-3.216 2.384l-.21.016-.202.005a3.926 3.926 0 01-3.536-2.22l-.083-.183-.015-.035H6.313c-1.171 0-2.139-.87-2.292-1.998l-.016-.156L4 16.245c0-.903.52-1.693 1.325-2.076l.165-.071.135-.048v-2.238A6.377 6.377 0 019.75 5.846 2.312 2.312 0 0112 3zm0 3.938c-.437 0-.86.057-1.262.165l-.148.042a4.876 4.876 0 00-3.46 4.441l-.005.226v2.808c0 .414-.31.756-.71.806l-.197.012a.813.813 0 00-.007 1.613l.101.007h3.25l.005.143a2.438 2.438 0 002.272 2.289l.161.005.16-.005a2.438 2.438 0 002.272-2.265l.005-.168h3.25l.102-.006a.813.813 0 000-1.612l-.196-.012a.813.813 0 01-.712-.704l-.006-.103v-2.807l-.003-.183a4.878 4.878 0 00-3.461-4.485l-.143-.041A4.881 4.881 0 0012 6.937zM12 4.5a.812.812 0 10.788 1.013l.018-.099.007-.101A.812.812 0 0012 4.5z"
                  fill="currentcolor"
                  fillRule="evenodd"
                ></path>
              </svg>
            </div>
            <span className="text-[10px]">Notifs</span>
          </a>
        </div>
        <div className="relative flex h-full flex-col items-center justify-center py-2">
          <a
            className="flex flex-col items-center justify-center text-text-tertiary"
            href="#"
          >
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 15 15"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 pointer-events-none"
            >
              <path
                d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="text-[10px]">Profile</span>
          </a>
        </div>
      </nav>
    </div>
  );
}
