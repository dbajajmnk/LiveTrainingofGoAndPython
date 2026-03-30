function checkGrade(score) {
    let grade;

   
    if (score >= 90) {
        grade = 'A';
    } else if (score >= 80) {
        grade = 'B';
    } else if (score >= 70) {
        grade = 'C';
    } else {
        grade = 'F';
    }
    console.log(`If-else result: Grade ${grade}`);
}

function checkFruit(fruit) {
    let message;

        switch (fruit) {
        case 'apple':
            message = 'It\'s an apple!';
            break;
        case 'banana':
            message = 'It\'s a banana!';
            break;
        default:
            message = 'Unknown fruit';
    }
    console.log(`Switch result: ${message}`);
}

function checkAge(age) {
    
    const beverage = age >= 21 ? 'Beer' : 'Juice';
    console.log(`Ternary operator result: You can have ${beverage}.`);
}


checkGrade(85);
checkFruit('banana');
checkAge(26);
