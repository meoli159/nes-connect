import React from 'react';
import "./style.css";

function ProfileSettingFunction() {

  const listSettingFunction = [
    { id: 1, settingFunctionName: "Setting 1" },
    { id: 2, settingFunctionName: "Setting 2" },
    { id: 3, settingFunctionName: "Setting 3" },
    { id: 4, settingFunctionName: "Setting 4" },
    { id: 5, settingFunctionName: "Setting 5" },
    { id: 6, settingFunctionName: "Setting 6" },
    { id: 7, settingFunctionName: "Setting 7" },
    { id: 8, settingFunctionName: "Setting 8" },
    { id: 9, settingFunctionName: "Setting 9" },
    { id: 10, settingFunctionName: "Setting 10" },
    { id: 11, settingFunctionName: "Setting 11" },
    { id: 12, settingFunctionName: "Setting 12" },
    { id: 13, settingFunctionName: "Setting 13" },
    { id: 14, settingFunctionName: "Setting 14" },
    { id: 15, settingFunctionName: "Setting 15" },
    { id: 16, settingFunctionName: "Setting 16" },
    { id: 17, settingFunctionName: "Setting 17" },
    { id: 18, settingFunctionName: "Setting 18" },
    { id: 19, settingFunctionName: "Setting 19" },
    { id: 20, settingFunctionName: "Setting 20" },
  ]

  return (
    <div>
      <div>
        {listSettingFunction?.map((settingFunction) => {
          return (
            <div className="setting-function-wrapper" key={settingFunction.id}>

            <div className="setting-function-title">
              <span>{settingFunction.settingFunctionName}</span>
            </div>
          
          </div>
        );
      })}
               
      </div>

    </div>
)
}

export default ProfileSettingFunction;