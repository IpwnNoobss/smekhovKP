function deleteCtrl($http, $location, $routeParams) {
    let vm = this;
    vm.error = '';
    vm.title = "Удаление";
    const id = $routeParams.id;

    vm.formModel = {
        FCS: {},
        dateFiling: {},

    };

    vm.sendForm = function () {
        vm.error = '';
        console.log('waiting...');
        let p1 = $http.delete('/api/appeals/' + id, {
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
            const oneRow = res.data;
            vm.formModel.FCS.value = oneRow.FCS;
            vm.formModel.dateFiling.value = new Date(oneRow.dateFiling);

        }, err=>{
            vm.error = 'Ошибка: ' + JSON.stringify(err);

        });
    }

    init();


}