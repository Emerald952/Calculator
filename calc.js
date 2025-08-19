const numKey = document.querySelectorAll('.num');
const opKey = document.querySelectorAll('.op');
const equal = document.querySelector('.eq');
const clear = document.querySelector('.clr');
const bkspc = document.querySelector('.bkspc');
const inp = document.getElementById('userInp');

function isOperator(ch){
    return ['+', '-', '*', '/'].includes(ch);
}

function evaluate(val1, val2, op){
    switch(op){
        case '+': return val1+val2;
        case '-': return val1 - val2;
        case '*': return val1*val2;
        case '/': return val1 / val2;
        default: return "Invalid Operator";
    }    
}
function precedence(op){
    if(op == '+' || op == '-')return 1;
    if(op == '*' || op == '/')return 2;
    return 0;
}

numKey.forEach(function(key){
    key.addEventListener('click', function(){
        if(inp.value == "Cannot Divide By Zero!" || inp.value == "Invalid Operator"){
            inp.value=key.textContent;
        }else{
            inp.value += key.textContent;
        }
    })
})

opKey.forEach(function(op){
    op.addEventListener('click', function(){
        const currInp = inp.value.trim();
        if(currInp && (currInp == "Cannot Divide By Zero!" || currInp == "Invalid Operator")){
            inp.value='';
        }
        else if(currInp && !isOperator(currInp[currInp.length - 1])){
            inp.value += ` ${op.textContent} `;
        }else{
            return;
        }
    })
})

equal.addEventListener('click', function(){
    const currInp = inp.value.trim();
    if(!currInp || isOperator(currInp[currInp.length - 1])){
        return;
    }
    else{
        inp.value = evaluateExp(currInp);
    }
})

clear.addEventListener('click', function(){
    inp.value='';
})

bkspc.addEventListener('click', function(){
    let currInp = inp.value.trim();
    if(!currInp || currInp == "Cannot Divide By Zero!" || currInp == "Invalid Operator"){
        inp.value = '';
        return;
    }
    else{
        currInp= currInp.slice(0,-1);
        inp.value = currInp;
    }
})

function evaluateExp(exp){
    let num = [];
    let op = [];
    let i = 0;
    while(i < exp.length){
        let ch = exp[i];

        if(ch == ' '){
            i++;
            continue;
        }

        if(!isNaN(ch)){
            let val = 0;
            while(i < exp.length && !isNaN(exp[i]) && exp[i] != ' '){
                val = val*10 + Number(exp[i]);
                i++;
            }
            num.push(val);
        }
        else if(ch == '('){
            op.push(ch);
        }
        else if(ch == ')'){
            while(op[op.length - 1] != '('){
                let val2 = num.pop();
                let val1 = num.pop();
                let ops = op.pop();
                if(ops == '/'){
                    if(val2 == 0){
                        return "Cannot Divide By Zero!";
                    }
                }
                num.push(evaluate(val1, val2, ops));
            }
            op.pop();
        }
        else{
            while(op.length && precedence(op[op.length - 1]) >= precedence(ch)){
                let val2 = num.pop();
                let val1 = num.pop();
                let ops = op.pop();
                if(ops == '/'){
                    if(val2 == 0){
                        return "Cannot Divide By Zero!";
                    }
                }
                num.push(evaluate(val1, val2, ops));
            }
            op.push(ch);
        }
        i++;
    }
    while(op.length){
        let val2 = num.pop();
        let val1 = num.pop();
        let ops = op.pop();
        if(ops == '/'){
            if(val2 == 0){
                return "Cannot Divide By Zero!";
            }
        }
        num.push(evaluate(val1, val2, ops));
    }
    return num.pop();
}