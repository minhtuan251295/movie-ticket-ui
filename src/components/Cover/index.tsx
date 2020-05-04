import * as React from 'react';

interface ICoverProps {
}

const Cover: React.FunctionComponent<ICoverProps> = (props) => {
  return (
    <React.Fragment>
      <img src="/cover.png" alt="Cover" className="w-100" style={{ height: 'calc(100vh - 4px)' }} />
    </React.Fragment>
  );
};

export default Cover;
