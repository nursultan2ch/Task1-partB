import { useRef, useEffect, useState } from "react";
import * as NGL from "ngl";
import { StageContext } from "./StageContext";

interface StageProps {
  width: string;
  height: string;
  children:React.ReactNode;
}

const Stage: React.FC<StageProps> = ({ children, width, height }) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<any>(null);

  useEffect(() => {
    if (viewerRef.current && !stage) {
      const newStage = new NGL.Stage(viewerRef.current);
      setStage(newStage);
    }

    return () => {
      if (stage) {
        stage.dispose();
      }
    };
  }, [stage]);

  return (
    <div ref={viewerRef} style={{ width: width, height: height }}>
    <StageContext.Provider value={stage}>
      {children}
    </StageContext.Provider>
    </div>
  );
};

export default Stage;