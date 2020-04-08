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

        for (let field in vm.formModel) {
            if (field !== 'dateFiling' && field !== 'service') {
                vm.formModel[field].valid = onlyLettersAndDigits.test(vm.formModel[field].value);
                vm.formModel[field].infoText = (vm.formModel[field].valid) ? 'Введено верно' : 'Допускаются только буквы и цифры';
            }
            if (field === 'service') {
                vm.formModel.service.valid = (vm.formModel.service.value !== undefined) && (vm.formModel.service.value !== '');
                vm.formModel.service.infoText = (vm.formModel.service.valid) ? 'Введено верно' : 'Выберите категорию';
            }
            vm.formWasValidated = vm.formWasValidated && vm.formModel[field].valid;
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