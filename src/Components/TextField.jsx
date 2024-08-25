import React from "react";
import "../Style/textField.css";

const TextField = React.forwardRef(({
  type = "text",
  placeholder,
  value,
  onChange,
  Icon,
  fullWidth = false,
  styles = {},
  onKeyDown,
  ...rest
}, ref) => {
  return (
    <div className={`text__field ${fullWidth ? "full__width" : ''}`} style={styles}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        ref={ref} // Forward the ref to the input element
        {...rest}
      />
      {Icon && Icon}
    </div>
  );
});

export default TextField;
