function createCtrl($http, $location) {
    let vm = this;
    vm.error = '';
    vm.title = "";

    const invalidMessage = 'Допускаются только буквы и цифры';
    vm.formWasValidated = false;

    vm.formModel = {
        FCS: {
            valid: false,
            infoText: invalidMessage,
            value: ''
        },
        actualAddress: {
            valid: false,
            infoText: invalidMessage,
            value: ''
        },
        phoneNumber: {
            valid: false,
            infoText: invalidMessage,
            value: ''
        },
        service: {
            valid: false,
            infoText: invalidMessage,
            value: ''
        },
        CheIndex: {
            valid: false,
            infoText: invalidMessage,
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
        let p1 = $http.post('/api/appeals', {
            FCS: vm.formModel.FCS.value,
            actualAddress: vm.formModel.actualAddress.value,
            phoneNumber: vm.formModel.phoneNumber.value,
            service: vm.formModel.service.value,
            CheIndex: vm.formModel.CheIndex.value,
            dateFiling: vm.formModel.dateFiling.value,

        }, {
            headers: {
                token: localStorage.getItem('token')
            }
        });

        p1.then(res => {
            console.log('success!');
            $location.path('/');
        }, err => {
            vm.error = 'Ошибка: ' + JSON.stringify(err);

        });
    }


}