import {
  LucideProps,
  GlobeIcon,
  DicesIcon,
  BookIcon,
  PaintbrushIcon,
  FlaskRoundIcon,
  MedalIcon,
} from "lucide-react";

type IconType = {
  [key: string]: (props: LucideProps) => JSX.Element;
};

const Icons = {
  globe: (props: LucideProps) => <GlobeIcon {...props} />,
  dices: (props: LucideProps) => <DicesIcon {...props} />,
  book: (props: LucideProps) => <BookIcon {...props} />,
  paintbrush: (props: LucideProps) => <PaintbrushIcon {...props} />,
  flaskRound: (props: LucideProps) => <FlaskRoundIcon {...props} />,
  medal: (props: LucideProps) => <MedalIcon {...props} />,
  logo: (props: LucideProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-crown"
    >
      <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
    </svg>
  ),
} as IconType;

export default Icons;
