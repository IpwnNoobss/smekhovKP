function updateCtrl($http, $location, $routeParams) {
    let vm = this;
    vm.error = '';
    vm.title = "Изменение";
    const id = $routeParams.id;


    vm.formWasValidated = false;

    vm.formModel = {
        FCS: {
            valid: true,
            infoText: '',
            value: ''
        },
        actualAddress: {
            valid: true,
            infoText: '',
            value: ''
        },
        phoneNumber: {
            valid: true,
            infoText: '',
            value: ''
        },
        service: {
            valid: true,
            infoText: '',
            value: ''
        },
        CheIndex: {
            valid: true,
            infoText: '',
            value: ''
        },
        dateFiling: {
            valid: true,
            infoText: '',
            value: new Date()
        },

    };

    vm.validate = function () {
        vm.formWasValidated = true;
        const onlyLettersAndDigits = /^([-\.a-zа-яё \d]+)$/i;
        const onlyLettersAndDigitsPhoneNumber = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/i;
        const onlyLettersAndDigitsCheIndex = /[0-9]{6}/i;

        for (let field in vm.formModel) {
            if (field !== 'dateFiling' && field !== 'service') {
                if (field === 'phoneNumber') {
                    vm.formModel[field].valid = onlyLettersAndDigitsPhoneNumber.test(vm.formModel[field].value);
                    vm.formModel[field].infoText = (vm.formModel[field].valid) ? 'Введено верно' : 'Номер телефона в любом формате';
                    vm.formWasValidated = vm.formWasValidated && vm.formModel[field].valid;
                } else {
                    if (field === 'CheIndex') {
                        vm.formModel[field].valid = onlyLettersAndDigitsCheIndex.test(vm.formModel[field].value);
                        vm.formModel[field].infoText = (vm.formModel[field].valid) ? 'Введено верно' : 'Формат индекса';
                        vm.formWasValidated = vm.formWasValidated && vm.formModel[field].valid;
                    } else {
                        vm.formModel[field].valid = onlyLettersAndDigits.test(vm.formModel[field].value);
                        vm.formModel[field].infoText = (vm.formModel[field].valid) ? 'Введено верно' : 'Допускаются только буквы и цифры';
                        vm.formWasValidated = vm.formWasValidated && vm.formModel[field].valid;
                    }
                }
            }
        }
    };

    vm.sendForm = function () {

        vm.error = '';
        console.log('waiting...');
        let p1 = $http.put('/api/appeals/' + id, {
            FCS: vm.formModel.FCS.value,
            actualAddress: vm.formModel.actualAddress.value,
            phoneNumber: vm.formModel.phoneNumber.value,
            service: vm.formModel.service.value,
            CheIndex: vm.formModel.CheIndex.value,
            dateFiling: vm.formModel.dateFiling.value,

        }, {
            headers : {
                token: localStorage.getItem('token')
            }
        });

        p1.then(res=>{
            console.log('success!');
            $location.path('/');
        }, err=>{
            vm.error = 'Ошибка: ' + JSON.stringify(err);

        });
    };

    function init() {

        vm.error = '';
        console.log('waiting...');


        let p1 = $http.get('/api/appeals/' + id, {
            headers : {
                token: localStorage.getItem('token')
            }
        });

        p1.then(res=>{
            //console.log('success!');
            const oneRow = res.data;
            vm.formModel.FCS.value = oneRow.FCS;
            vm.formModel.actualAddress.value = oneRow.actualAddress;
            vm.formModel.phoneNumber.value = oneRow.phoneNumber;
            vm.formModel.service.value = oneRow.service;
            vm.formModel.CheIndex.value = oneRow.CheIndex;
            vm.formModel.dateFiling.value = new Date(oneRow.dateFiling);

            vm.validate();
        }, err=>{
            vm.error = 'Ошибка: ' + JSON.stringify(err);

        });
    }

    init();


}