/**
 * Steps 
 * proive the featurs based on user input example let say
 * 10 featues availabe in app and user want to unable 2 feture only
 * They can do that
 * 
 */

function featureToggler(slectedFeature){
    let feature;
    switch(slectedFeature){
        case 1: feature=()=>`Feature ${slectedFeature} is enabled`;
        break;
        case 2: feature=()=>`Feature ${slectedFeature} is enabled`;
        break;
        case 3: feature=()=>`Feature ${slectedFeature} is enabled`;
        break;
        default:
        feature=()=>`Feature ${slectedFeature} is not implemented sorry`


    }

    return feature;
}

console.log(featureToggler(2)())