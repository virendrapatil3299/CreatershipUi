import { Range } from 'react-range';

const RangeSlider = ({ label, min, max, step, values, onChange, suffix = "", maxLabel }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">{label}</label>

      <Range
        values={values}
        step={step}
        min={min}
        max={max}
        onChange={onChange}
        renderTrack={({ props, children }) => {
          const { key, ...trackProps } = props;
          return (
            <div {...trackProps} className="h-2 bg-gray-200 rounded-full relative">
              <div
                className="absolute h-2 bg-orange-500 rounded-full"
                style={{
                  left: `${((values[0] - min) / (max - min)) * 100}%`,
                  width: `${((values[1] - values[0]) / (max - min)) * 100}%`,
                }}
              />
              {children}
            </div>
          );
        }}
        renderThumb={({ props, key }) => {
          const { key: _, ...thumbProps } = props;
          return (
            <div key={key} {...thumbProps} className="w-4 h-4 bg-orange-500 rounded-full border-2 border-white shadow" />
          );
        }}
      />

      <div className="flex justify-between text-xs text-gray-500">
        <span>{min.toLocaleString()}{suffix}</span>
        <span>{maxLabel || `${max.toLocaleString()}${suffix}`}</span>
      </div>

      <div className="flex justify-end gap-2 text-sm text-gray-500">
        <span className="bg-orange-100 px-3 py-1 rounded">
          {values[0].toLocaleString()}{suffix}
        </span>
        <span className="bg-orange-100 px-3 py-1 rounded">
          {values[1].toLocaleString()}{suffix}
        </span>
      </div>
    </div>
  );
};

export default RangeSlider;
