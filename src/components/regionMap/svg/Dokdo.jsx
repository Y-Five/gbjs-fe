export default function SvgIcon({
  fill = "#A8A8A8",
  selected = false,
  name = "독도",
  textX = 1,
  textY = 13,
  ...props
}) {
  return (
    <g transform="translate(291.89, 79.72)">
      <path
        fill={fill}
        d="M3.2813 0.828962C4.08643 0.68717 5.29687 0.660915 6.07461 0.912989C7.0331 1.22283 8.0299 3.07663 7.6027 3.91687C7.48768 4.13744 3.82902 6.00174 3.46206 6.01749C2.90887 6.04375 1.92847 5.38206 1.56151 4.97769C0.0662736 3.33396 1.27123 1.18607 3.2813 0.828962Z"
        {...props}
      />
      <text
        x={textX}
        y={textY}
        textAnchor="middle"
        fontSize="6"
        fill="#FFFFFF"
        fontWeight="700"
        pointerEvents="none"
      >
        {name}
      </text>
    </g>
  );
}
