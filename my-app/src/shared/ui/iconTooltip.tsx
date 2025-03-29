"use client";

import { useState } from "react";
import Icon from "./icon";

interface Props {
  iconName: string;
  children: React.ReactNode;
  className?: string;
}

export default function IconTooltip({ iconName, children, className }: Props) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className={className}>
      <div className="relative cursor-pointer">
        <div onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
          <Icon name={iconName} size="xs" />
        </div>
        {showTooltip && <div className="tooltip">{children}</div>}
      </div>
    </div>
  );
}
