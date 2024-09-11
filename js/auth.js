const URL = "http://195.158.9.124:4109"
const Authentication = (e,goal) => {
    e.preventDefault();
    let form = e.target;
    let formData = new FormData(form);
    let user = {};
    formData.forEach((value, key) => {
        user[key] = value;
    });
    console.log(user);

    if (goal == 'signup'){
        axios.post(`${URL}/auth/reg`, user)
            .then((res) => {
                console.log(res);
                if (res.data == "exist") {
                new Hospital().notif(
                    "warning",
                    "Xatolik yuz berdi!",
                    "Bunday foydalanuvchi tizimda mavjud."
                );
                form.reset();
                }
                if (res.data == "success") {
                new Hospital().notif(
                    "success",
                    "Ro`yxatdan muvaffaqiyatli o`tdingiz!",
                    "Tizimga kirishingiz mumkin."
                );
                setTimeout(() => {
                    window.location = "../src/login.html";
                }, 1000);
                form.reset();
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }
    if (goal == 'login'){
        axios.post(`${URL}/auth/login`, user)
            .then((res) => {
                console.log(res);
                let {token} = res.data;
                localStorage.setItem('token', token);
                new Hospital().notif('success', 'Tizimga Xush kelibsiz!','Bir necha soniyalardan keyin asosiy sahifada bo`lasiz.')
                setTimeout(() => {
                    window.location = '../src/index.html'
                }, 1000);
            })
            .catch((err) => {
                console.error(err);
                new Hospital().notif(
                    "warning","Xatolik yuz berdi!", err?.response?.data || "Serverda xatolik")
            });
    }
};