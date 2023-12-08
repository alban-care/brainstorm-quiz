type ProgressBarProps = {
  total?: number;
  current?: number;
};

const ProgressBar = ({ total, current }: ProgressBarProps) => {
  if (!total || !current) {
    total = 1;
    current = 0;
  }

  const percent = (current / total) * 100;

  return (
    <div className="w-full my-4 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div
        className="bg-blue-600 h-2.5 rounded-full"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};

export default ProgressBar;
