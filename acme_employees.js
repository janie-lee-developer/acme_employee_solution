 const employees = [
  { id: 1, name: 'moe'},
  { id: 2, name: 'larry', managerId: 1},
  { id: 4, name: 'shep', managerId: 2},
  { id: 3, name: 'curly', managerId: 1},
  { id: 5, name: 'groucho', managerId: 3},
  { id: 6, name: 'harpo', managerId: 5},
  { id: 8, name: 'shep Jr.', managerId: 4},
  { id: 99, name: 'lucy', managerId: 1}
];

const spacer = (text)=> {
  if(!text){
    return console.log('');
  }
  const stars = new Array(5).fill('*').join('');
  console.log(`${stars} ${text} ${stars}`);
}

const findEmployeeByName = (name, arr) => {
    let found;
    arr.forEach((obj) => {
        if (obj.name === name) {
            found = {...obj}
        }
    });
    return found;
}

spacer('findEmployeeByName Moe')
// given a name and array of employees, return employee
console.log(findEmployeeByName('moe', employees));//{ id: 1, name: 'moe' }
spacer('')

const findManagerFor = (employee, arr) => {
    let solution;
    arr.forEach((ele)=> {
        if (ele.id === employee.managerId) {
            solution = {...ele}
        }
    });
    return solution;
}

spacer('findManagerFor Shep Jr.')
//given an employee and a list of employees, return the employee who is the manager
console.log(findManagerFor(findEmployeeByName('shep Jr.', employees), employees));//{ id: 4, name: 'shep', managerId: 2 }
spacer('')

const findCoworkersFor = (employeeObj, arr) => {
    let solutionArr = [];
    arr.forEach((eleObj) => {
        if (eleObj.managerId === employeeObj.managerId && eleObj.name !== employeeObj.name) {
            solutionArr.push({...eleObj})
        }
    })
    return solutionArr;
}
spacer('findCoworkersFor Larry')

//given an employee and a list of employees, return the employees who report to the same manager
console.log(findCoworkersFor(findEmployeeByName('larry', employees), employees));/*
[ { id: 3, name: 'curly', managerId: 1 },
  { id: 99, name: 'lucy', managerId: 1 } ]
*/

spacer('');

const findManagementChainForEmployee = (employeeObj, arr) => { 
    let solutionArr = [];
    arr.forEach((ele) => {
        if (ele.id === employeeObj.managerId) { 
            solutionArr.unshift({...ele});
            solutionArr.unshift(...findManagementChainForEmployee(ele, arr)); //[kevin, jon] + []
        }
    });
    return solutionArr;
}

spacer('findManagementChain for moe')
//given an employee and a list of employees, return a the management chain for that employee. The management chain starts from the employee with no manager with the passed in employees manager 
console.log(findManagementChainForEmployee(findEmployeeByName('moe', employees), employees));//[  ]
spacer('');

spacer('findManagementChain for shep Jr.')
console.log(findManagementChainForEmployee(findEmployeeByName('shep Jr.', employees), employees));/*
[ { id: 1, name: 'moe' },
  { id: 2, name: 'larry', managerId: 1 },
  { id: 4, name: 'shep', managerId: 2 }]
*/
spacer('');

const generateManagementTree = (compArr) => {
    
    // resultArr.from(compArr)

    let queue = [compArr[0]];

    while (queue.length) {
        let reports = [];
        for (let employee of compArr) {
            if (queue[0]['id'] === employee.managerId) {
                reports.push(employee);
            }
        }
        queue[0]['reports'] = reports;
        queue.shift();
        queue.push(...reports);
    }
    return compArr[0];
}
    // for (let i = 0; i < compArr.length; i++){ //moe
    //     let arr = [];
    //     for (let j = i+1; j < compArr.length; j++ ) { //2,3,4,5 //3,4,5
    //         // if (compArr[j].managerId === compArr[i].id) {

    //         // }
    //     }
    //     resultObj.reports = [...arr];
    // }
    // return resultObj;


spacer('generateManagementTree')
//given a list of employees, generate a tree like structure for the employees, starting with the employee who has no manager. Each employee will have a reports property which is an array of the employees who report directly to them.
console.log(JSON.stringify(generateManagementTree(employees), null, 2));
/*
{
  "id": 1,
  "name": "moe",
  "reports": [
    {
      "id": 2,
      "name": "larry",
      "managerId": 1,
      "reports": [
        {
          "id": 4,
          "name": "shep",
          "managerId": 2,
          "reports": [
            {
              "id": 8,
              "name": "shep Jr.",
              "managerId": 4,
              "reports": []
            }
          ]
        }
      ]
    },
    {
      "id": 3,
      "name": "curly",
      "managerId": 1,
      "reports": [
        {
          "id": 5,
          "name": "groucho",
          "managerId": 3,
          "reports": [
            {
              "id": 6,
              "name": "harpo",
              "managerId": 5,
              "reports": []
            }
          ]
        }
      ]
    },
    {
      "id": 99,
      "name": "lucy",
      "managerId": 1,
      "reports": []
    }
  ]
}
*/
spacer('');

spacer('displayManagementTree')

const displayManagementTree = (treeObj) => {
    
    let dash = '-'
    let dashNum = treeObj.managerId;
    console.log(`${dash.repeat(dashNum)}${treeObj.name}`)
    for (let i = 0; i < treeObj.reports.length; i++) {
        displayManagementTree(treeObj['reports'][i]);
    }
}

//given a tree of employees, generate a display which displays the hierarchy
displayManagementTree(generateManagementTree(employees));/*
moe
-larry
--shep
---shep Jr.
-curly
--groucho
---harpo
-lucy
*/