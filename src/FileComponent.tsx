import React, { useEffect, useRef, useContext } from 'react';
import { StageContext } from './StageContext';

interface NGLFileProps {
  file?: File;
}

const FileComponent: React.FC<NGLFileProps> = ({ file }) => {
  const stage = useContext(StageContext);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (file && stage) {
      stage.removeAllComponents();

      const reader = new FileReader();
      reader.onload = (e) => {
        const pdbData = e.target?.result;
        if (pdbData) {
          stage.loadFile(file, { defaultRepresentation: true }).then((o: any) => {
            stage.autoView();
          });
        }
      };
      reader.readAsText(file);
    }

    return () => {
      if (stage) {
        stage.dispose();
      }
    };
  }, [file, stage]);

  useEffect(() => {
    if (containerRef.current && stage) {
      const domElement = stage.viewer.renderer.domElement;
      containerRef.current.appendChild(domElement);
    }
  }, [file, stage]);

  return <div ref={containerRef} />;
};

export default FileComponent;
