
const url = "http://195.158.9.124:4109";
class Hospital {
    constructor(apiUrl,columns,others) {
        this.apiUrl = apiUrl
        this.columns = columns
        this.list = []
        this.object = {}
        this.others = others
        this.selects = {}
    }

    notif(style,title,text){
        let bgColor = "bg-green-100";
        let svg1Status = "block";
        let svg2Status = "hidden";
        if (style == 'warning'){
            bgColor = "bg-red-100";
            svg2Status = "block";
            svg1Status = "hidden";
        }
        const notifBox = document.createElement('div');
        notifBox.className = 
          "pointer-events-none z-[51] fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
        ;
        const innerBox = document.createElement('div');
        innerBox.className = 
          "flex w-full flex-col items-center space-y-4 sm:items-end"
        ;
        const colorBox = document.createElement('div');
        colorBox.className = 
          `${bgColor} pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 flex items-start p-4`
        ;
        const SVGs = document.createElement('div');
        SVGs.className = "flex-shrink-0";
        SVGs.innerHTML = `
            <svg class="h-6 w-6 text-green-400 ${svg1Status}" id="successSVG" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <svg class="h-6 w-6 text-red-400 ${svg2Status}" id="failureSVG" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M12 7C11.7348 7 11.4804 7.10536 11.2929 7.29289C11.1054 7.48043 11 7.73478 11 8V12C11 12.2652 11.1054 12.5196 11.2929 12.7071C11.4804 12.8946 11.7348 13 12 13C12.2652 13 12.5196 12.8946 12.7071 12.7071C12.8946 12.5196 13 12.2652 13 12V8C13 7.73478 12.8946 7.48043 12.7071 7.29289C12.5196 7.10536 12.2652 7 12 7ZM12.92 15.62C12.8981 15.5563 12.8679 15.4957 12.83 15.44L12.71 15.29C12.5694 15.1512 12.3908 15.0572 12.1968 15.0199C12.0028 14.9825 11.8021 15.0034 11.62 15.08C11.4988 15.1306 11.3872 15.2017 11.29 15.29C11.1973 15.3834 11.124 15.4943 11.0742 15.6161C11.0245 15.7379 10.9992 15.8684 11 16C11.0016 16.1307 11.0288 16.2598 11.08 16.38C11.1249 16.5041 11.1966 16.6168 11.2899 16.7101C11.3832 16.8034 11.4959 16.8751 11.62 16.92C11.7397 16.9729 11.8691 17.0002 12 17.0002C12.1309 17.0002 12.2603 16.9729 12.38 16.92C12.5041 16.8751 12.6168 16.8034 12.7101 16.7101C12.8034 16.6168 12.8751 16.5041 12.92 16.38C12.9712 16.2598 12.9984 16.1307 13 16C13.0049 15.9334 13.0049 15.8666 13 15.8C12.9828 15.7362 12.9558 15.6755 12.92 15.62V15.62ZM12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7363 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2V2ZM12 20C10.4178 20 8.87104 19.5308 7.55544 18.6518C6.23985 17.7727 5.21447 16.5233 4.60897 15.0615C4.00347 13.5997 3.84504 11.9911 4.15372 10.4393C4.4624 8.88743 5.22433 7.46197 6.34315 6.34315C7.46197 5.22433 8.88743 4.4624 10.4393 4.15372C11.9911 3.84504 13.5997 4.00346 15.0615 4.60896C16.5233 5.21447 17.7727 6.23984 18.6518 7.55544C19.5308 8.87103 20 10.4177 20 12C20 14.1217 19.1572 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20V20Z"
                    fill="#FF0000" />
            </svg>
        `;
        const notifContent = document.createElement('div');
        notifContent.className = "ml-2 w-0 flex-1 pt-0.5";
        const notifTitle = document.createElement('p');
        notifTitle.className = "text-sm font-medium text-gray-900";
        notifTitle.textContent = title;
        const notifText = document.createElement('p');
        notifText.className = "mt-1 text-sm text-gray-600";
        notifText.textContent = text;

        notifContent.append(notifTitle, notifText);
        colorBox.append(SVGs,notifContent);
        innerBox.append(colorBox);
        notifBox.append(innerBox);
        document.body.append(notifBox);
        setTimeout(() => {
            notifBox.remove();
        }, 2000);
    }

    checkUser(){
        axios.post(`${url}/auth/checkuser`,{},{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
        }).catch((err) => {
        console.error(err);
        if (err.status == 401 ){
            this.notif('warning','Tizimdan foydalanish rad etildi!','Sizga tizimdan foydalanishga ruxsat yo`q. Iltimos,barcha ma`lumotlar to`g`ri ekanligiga ishonch hosil qiling va qayta urinib koring!');
            localStorage.removeItem('token')
            setTimeout(() => {
                window.location = '../src/login.html'
            }, 1000);
        }
        });
    }

    rendermenu(){
        const ul = document.getElementById('navbar');
        ul.innerHTML = '';
        const menuList = [
            {
                title: "Bosh sahifa",
                link: "../src/index.html",
                svg: `
                        <svg class="h-6 w-6 shrink-0 text-white" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
                        </svg>
                        `,
            },
            {
                title: "Bo`limlar",
                link: "../src/departments.html",
                svg: `
                        <svg class="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                        </svg>
                    `,
            },
            {
                title: "Xonalar",
                link: "../src/rooms.html",
                svg: `
                        <svg class="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 16C6.80222 16 6.60888 16.0586 6.44443 16.1685C6.27998 16.2784 6.15181 16.4346 6.07612 16.6173C6.00043 16.8 5.98063 17.0011 6.01921 17.1951C6.0578 17.3891 6.15304 17.5673 6.29289 17.7071C6.43275 17.847 6.61093 17.9422 6.80491 17.9808C6.99889 18.0194 7.19996 17.9996 7.38268 17.9239C7.56541 17.8482 7.72159 17.72 7.83147 17.5556C7.94135 17.3911 8 17.1978 8 17C8 16.7348 7.89464 16.4804 7.70711 16.2929C7.51957 16.1054 7.26522 16 7 16ZM19.06 12L20.29 10.77C20.8518 10.2075 21.1674 9.445 21.1674 8.65C21.1674 7.855 20.8518 7.0925 20.29 6.53L17.46 3.71C16.8975 3.1482 16.135 2.83264 15.34 2.83264C14.545 2.83264 13.7825 3.1482 13.22 3.71L12 4.94C11.9843 4.15479 11.6613 3.40706 11.1004 2.85736C10.5395 2.30766 9.78536 1.99984 9 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7956 22 19V15C22.0002 14.2146 21.6923 13.4605 21.1426 12.8996C20.5929 12.3387 19.8452 12.0157 19.06 12ZM10 19C10 19.2652 9.89464 19.5196 9.70711 19.7071C9.51957 19.8946 9.26522 20 9 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H9C9.26522 4 9.51957 4.10536 9.70711 4.29289C9.89464 4.48043 10 4.73478 10 5V19ZM12 7.76L14.64 5.12C14.8274 4.93375 15.0808 4.82921 15.345 4.82921C15.6092 4.82921 15.8626 4.93375 16.05 5.12L18.88 8C19.0662 8.18736 19.1708 8.44081 19.1708 8.705C19.1708 8.96919 19.0662 9.22264 18.88 9.41L16 12.29L12 16.24V7.76ZM20 19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H11.82C11.9226 19.7036 11.9799 19.3935 11.99 19.08L17.07 14H19C19.2652 14 19.5196 14.1054 19.7071 14.2929C19.8946 14.4804 20 14.7348 20 15V19Z"/>
                        </svg>
                    `,
            },
            {
                title: "Mutaxassisliklar",
                link: "../src/spec.html",
                svg: `
                <svg class="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 9H11V7C11 6.73478 10.8946 6.48043 10.7071 6.29289C10.5196 6.10536 10.2652 6 10 6C9.73478 6 9.48043 6.10536 9.29289 6.29289C9.10536 6.48043 9 6.73478 9 7V9H7C6.73478 9 6.48043 9.10536 6.29289 9.29289C6.10536 9.48043 6 9.73478 6 10C6 10.2652 6.10536 10.5196 6.29289 10.7071C6.48043 10.8946 6.73478 11 7 11H9V13C9 13.2652 9.10536 13.5196 9.29289 13.7071C9.48043 13.8946 9.73478 14 10 14C10.2652 14 10.5196 13.8946 10.7071 13.7071C10.8946 13.5196 11 13.2652 11 13V11H13C13.2652 11 13.5196 10.8946 13.7071 10.7071C13.8946 10.5196 14 10.2652 14 10C14 9.73478 13.8946 9.48043 13.7071 9.29289C13.5196 9.10536 13.2652 9 13 9ZM18 15V5C18 4.20435 17.6839 3.44129 17.1213 2.87868C16.5587 2.31607 15.7956 2 15 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V15C2 15.7956 2.31607 16.5587 2.87868 17.1213C3.44129 17.6839 4.20435 18 5 18H15C15.7956 18 16.5587 17.6839 17.1213 17.1213C17.6839 16.5587 18 15.7956 18 15ZM4 15V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H15C15.2652 4 15.5196 4.10536 15.7071 4.29289C15.8946 4.48043 16 4.73478 16 5V15C16 15.2652 15.8946 15.5196 15.7071 15.7071C15.5196 15.8946 15.2652 16 15 16H5C4.73478 16 4.48043 15.8946 4.29289 15.7071C4.10536 15.5196 4 15.2652 4 15ZM21 6C20.7348 6 20.4804 6.10536 20.2929 6.29289C20.1054 6.48043 20 6.73478 20 7V17C20 17.7956 19.6839 18.5587 19.1213 19.1213C18.5587 19.6839 17.7956 20 17 20H7C6.73478 20 6.48043 20.1054 6.29289 20.2929C6.10536 20.4804 6 20.7348 6 21C6 21.2652 6.10536 21.5196 6.29289 21.7071C6.48043 21.8946 6.73478 22 7 22H17C18.3261 22 19.5979 21.4732 20.5355 20.5355C21.4732 19.5979 22 18.3261 22 17V7C22 6.73478 21.8946 6.48043 21.7071 6.29289C21.5196 6.10536 21.2652 6 21 6Z"/>
                </svg>
                `,
            },
            {
                title: "Lavozimlar",
                link: "../src/position.html",
                svg: `
                        <svg class="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 8H19C19.2652 8 19.5196 7.89464 19.7071 7.70711C19.8946 7.51957 20 7.26522 20 7C20 6.73478 19.8946 6.48043 19.7071 6.29289C19.5196 6.10536 19.2652 6 19 6H5C4.73478 6 4.48043 6.10536 4.29289 6.29289C4.10536 6.48043 4 6.73478 4 7C4 7.26522 4.10536 7.51957 4.29289 7.70711C4.48043 7.89464 4.73478 8 5 8ZM21 11H3C2.73478 11 2.48043 11.1054 2.29289 11.2929C2.10536 11.4804 2 11.7348 2 12C2 12.2652 2.10536 12.5196 2.29289 12.7071C2.48043 12.8946 2.73478 13 3 13H21C21.2652 13 21.5196 12.8946 21.7071 12.7071C21.8946 12.5196 22 12.2652 22 12C22 11.7348 21.8946 11.4804 21.7071 11.2929C21.5196 11.1054 21.2652 11 21 11ZM19 16H5C4.73478 16 4.48043 16.1054 4.29289 16.2929C4.10536 16.4804 4 16.7348 4 17C4 17.2652 4.10536 17.5196 4.29289 17.7071C4.48043 17.8946 4.73478 18 5 18H19C19.2652 18 19.5196 17.8946 19.7071 17.7071C19.8946 17.5196 20 17.2652 20 17C20 16.7348 19.8946 16.4804 19.7071 16.2929C19.5196 16.1054 19.2652 16 19 16Z"/>
                        </svg>
                    `,
            },
            {
                title: "Xizmat turlari",
                link: "../src/service.html",
                svg: `
                    <svg class="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg"><path d="M10 17H11V18C11 18.2652 11.1054 18.5196 11.2929 18.7071C11.4804 18.8946 11.7348 19 12 19C12.2652 19 12.5196 18.8946 12.7071 18.7071C12.8946 18.5196 13 18.2652 13 18V17H14C14.2652 17 14.5196 16.8946 14.7071 16.7071C14.8946 16.5196 15 16.2652 15 16C15 15.7348 14.8946 15.4804 14.7071 15.2929C14.5196 15.1054 14.2652 15 14 15H13V14C13 13.7348 12.8946 13.4804 12.7071 13.2929C12.5196 13.1054 12.2652 13 12 13C11.7348 13 11.4804 13.1054 11.2929 13.2929C11.1054 13.4804 11 13.7348 11 14V15H10C9.73478 15 9.48043 15.1054 9.29289 15.2929C9.10536 15.4804 9 15.7348 9 16C9 16.2652 9.10536 16.5196 9.29289 16.7071C9.48043 16.8946 9.73478 17 10 17ZM19 6H17V5C17 4.20435 16.6839 3.44129 16.1213 2.87868C15.5587 2.31607 14.7956 2 14 2H10C9.20435 2 8.44129 2.31607 7.87868 2.87868C7.31607 3.44129 7 4.20435 7 5V6H5C4.20435 6 3.44129 6.31607 2.87868 6.87868C2.31607 7.44129 2 8.20435 2 9V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7956 22 19V9C22 8.20435 21.6839 7.44129 21.1213 6.87868C20.5587 6.31607 19.7956 6 19 6ZM9 5C9 4.73478 9.10536 4.48043 9.29289 4.29289C9.48043 4.10536 9.73478 4 10 4H14C14.2652 4 14.5196 4.10536 14.7071 4.29289C14.8946 4.48043 15 4.73478 15 5V6H9V5ZM20 19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V12H20V19ZM20 10H4V9C4 8.73478 4.10536 8.48043 4.29289 8.29289C4.48043 8.10536 4.73478 8 5 8H19C19.2652 8 19.5196 8.10536 19.7071 8.29289C19.8946 8.48043 20 8.73478 20 9V10Z"/>
                    </svg>
                    `,
                },
            {
                title: "Shifokorlar",
                link: "../src/doctors.html",
                svg: `
                    <svg class="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/>
                        </svg>
                    `,
                },
        ];
        menuList.forEach(menu => {
            ul.innerHTML += `
                <li>
                    <a href="${menu.link}"
                        class="bg-indigo-700 text-white group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold">
                        ${menu.svg}
                        ${menu.title}
                    </a>
                </li>`;
        })
    }

    settingModal(){
        const togglebtns = document.querySelectorAll('[data-func="toggleBtn"]') || [];
        const modal = document.getElementById('modal') || null;

        if (togglebtns.length == 0 || !modal){
            return false;
        }

        togglebtns.forEach(btn => {
            btn.onclick = () => {
                modal.classList.toggle('hidden');
            }
        })
    }

    api(option){
        return axios({
            method: option?.method || 'get',
            url: `${url}/${option?.api || this.apiUrl}/${option?.sufUrl || ""}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            },
            data: option?.data || null,
        }).catch(err => {
            this.notif('warning','Xatolik yuz berdi', `${err.response.data}`)
        })
    }

    getForm(){
        const form = document.getElementById('modalForm');
        form.onsubmit = async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            
            // const data ={};
            // formData.forEach((value,key) => {
            //     data[key] = value;
            // });
            // console.log(data, this.object?._id ? 'put' : 'post');
            
            if(this.object?._id){
                formData.append('_id', this.object._id)
            }

            let checkFile = document.querySelector('#modalForm [type="file"]')
            if(checkFile){
                console.log(checkFile.files);
                formData.append('file', checkFile?.files[0])
            }
            const fileNameDisplay = document.getElementById('fileName');
            checkFile.addEventListener("change", () => {
                const file = checkFile.files[0];
                if (file) {
                    fileNameDisplay.textContent = file.name;
                } else {
                    fileNameDisplay.textContent = "rasm tanlanmagan";
                }
            });
            
            let res = await this.api({
                method: this.object?._id ? 'put' : 'post',
                data: formData,
            });
            
            console.log(formData);
            // let res = await this.api({
            // method: this.object?._id ? 'put' : 'post',
            // data: {...this.object, ...data},
            // });
            console.log(res?.data);

            if (this.object?._id){
                this.list = this.list.map( item => {
                    if(item._id == res.data._id) return res.data
                    return item
                });
                this.notif("success", "Muvaffaqiyat", "Ma`lumotlar yangilandi!");
            } else {
                this.list = [{...res.data}, ...this.list];
                this.notif("success", "Muvaffaqiyat", "Yangi ma`lumot qo`shildi!");
            }
            this.render();
            form.reset();
            this.object = {};
        };
    };

    renderTableHead(){
        const thead = document.querySelector('thead');
        thead.innerHTML = " ";
        let str = `
            <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold font-serif text-gray-900 sm:pl-0" data-name="index">№</th>
        `;
        this.columns.forEach((column) => {
            str += `
                <th scope="col" class="py-3.5 px-2 text-center text-sm font-semibold font-serif text-gray-900" data-name="title">${column.label}</th>`;
        });
        str += `
            <th scope="col" class="px-2 py-3.5 text-center text-sm font-semibold font-serif text-gray-900" data-name="createdTime">O'zgartirishlar sanasi</th>
            <th scope="col" class="px-3 py-3.5 text-center text-sm font-semibold font-serif text-gray-900" data-name="status">Holati</th>
            <th scope="col" class="capitalize text-right text-sm font-semibold font-serif text-gray-900 py-3.5 pl-3 pr-4 sm:pr-0">
                tahrirlash
            </th>`;
        thead.innerHTML = str.slice();
    };

    dateValidator(value){
        return value < 10 ? `0${value}` : value
    };

    dateConverter(value){
        let date = new Date(value);
        
        return `${this.dateValidator(date.getDate())}/${this.dateValidator(date.getMonth()+1)}/${date.getFullYear()}  ${this.dateValidator(date.getHours())}:${this.dateValidator(date.getMinutes())}`
    };

    async deleteDepartment(_id){
        if (!confirm('Ushbu bo`limni o`chirmoqchimisiz?')){
            return false;
        };
        await this.api({
            method: 'delete',
            sufUrl: _id,
        });
        this.list = this.list.filter(item => {
            return item._id !== _id
        });
        this.render();
        this.notif('warning','O`chirildi','Ma`lumot tizimdan muvaffaqiyatli o`chirildi')
    };

    async getData(_id){
        let {data} = await this.api({
            sufUrl: _id,
        })
        this.object = {...data}
        const inputs = document.querySelectorAll("#modalForm [name]");

        inputs.forEach(input => {
            if(input.getAttribute('type') !== 'file'){
                input.value = this.object[input.getAttribute('name')];
            }
        });
        document.getElementById('modal').classList.remove('hidden');
    };

    async changeStatus(_id,status){
        let res = await this.api({
            method: 'put',
            data: {
                _id,
                status: status == 1 ? 0 : 1,
            },
        });
        this.list = this.list.map(item => {
            if( item._id == res.data._id) return res.data;
            return item;
        });
        this.render();
        this.notif('success','Ma`lumotlar yangilandi','Holat muvaffaqiyatli yangilandi');
    };

    render(){
        const tbody = document.querySelector('tbody');
        tbody.innerHTML = ' ';
        
        this.list.forEach((item,index) => {
            const tr = document.createElement('tr')

            const tdIndex = document.createElement('td');
            tdIndex.classList =
            "whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-600 sm:pl-0";
            tdIndex.textContent = index+1;
            tr.appendChild(tdIndex)
            
            this.columns.forEach(column => {
                const td = document.createElement('td');
                td.className = "whitespace-nowrap px-4 py-3 text-sm text-center capitalize font-medium text-gray-600";
                if (column?.tag && item[column.name]?.length > 0){
                    let src = `${url}/${item[column.name]?.at(0)}`;                    
                    td.innerHTML = `<img class="w-[80px] mx-auto aspect-[3/4] object-cover" src="${src}"/>`;
                }else{
                    td.textContent = item[column.name]; 
                }
                tr.appendChild(td)
            });

            const tdcreatedTime = document.createElement('td');
            tdcreatedTime.className =
            "whitespace-nowrap text-center px-5 py-3 text-sm text-gray-600";
            tdcreatedTime.textContent = this.dateConverter(item.updateTime || item.createdTime);
            tr.appendChild(tdcreatedTime);

            const tdStatus = document.createElement('td');
            tdStatus.className =
            `whitespace-nowrap px-3 text-center py-3 text-sm`;
                const statusBtn = document.createElement('a');
                statusBtn.className = `${
                item.status == 1
                    ? "text-green-500 hover:text-green-700"
                    : "text-red-500 hover:text-red-700"
                }`;
                statusBtn.setAttribute("href", "#");
                statusBtn.textContent = item.status == 1 ? "Active" : "Inactive";
                statusBtn.onclick = () => {
                    this.changeStatus(item._id,item.status)
                };
                tdStatus.appendChild(statusBtn);
            tr.appendChild(tdStatus);

            const tdEdit = document.createElement("td");
            tdEdit.className =
            "whitespace-nowrap flex mt-10 items-center justify-center gap-3 py-3 px-3  sm:pr-0 sm:justify-end";
                const editBtn = document.createElement('button');
                // <button type="button" class="rounded bg-indigo-50 px-2 py-1 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100">Tahrirlash</button>
                editBtn.className =
                "rounded bg-indigo-50 px-2 py-1 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100";
                editBtn.setAttribute("href", "#");
                editBtn.setAttribute("title", "tahrirlash");
                editBtn.setAttribute("type", "button");
                editBtn.textContent = 'edit'
                editBtn.onclick = () => {
                    this.getData(item._id);
                };

                const deleteBtn = document.createElement('button');
                deleteBtn.className =
                "rounded bg-red-400 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-500";
                deleteBtn.setAttribute("href", "#");
                deleteBtn.setAttribute("title", "o`chirish");
                editBtn.setAttribute("type", "button");
                deleteBtn.textContent = 'delete'
                deleteBtn.onclick = () => {
                    this.deleteDepartment(item._id);
                };
                tdEdit.append(editBtn,deleteBtn)
            tr.appendChild(tdEdit);
            tbody.appendChild(tr);
        });
    };

    async getAll(){
        let {data} = await this.api()
            console.log(data);
            this.list = [...data];
            this.render();
    };

    async getOthers(){
        this.selects = {
        }
        if (this.others?.length > 0)
            await Promise.all(this.others.map( async other => {
            console.log(other);
            let res = await this.api({
                api: other,
            });
            this.selects[other] = res.data;
            const selectElement = document.getElementById(other);
                    // // this part is responsible for options of select
                    // const selectButton = document.querySelector('button[aria-haspopup="listbox"]');
                    // selectElement?.classList.add("hidden");
                    // const buttonLabel = selectButton.querySelector("span.block");

                    // // Toggle the dropdown
                    // selectButton.addEventListener("click", function () {
                    //     const expanded = selectButton.getAttribute("aria-expanded") === "true";
                    //     selectButton.setAttribute("aria-expanded", !expanded);
                    //     selectElement?.classList.toggle("hidden");
                    // });
            if (selectElement && res.data.length > 0){
                selectElement.innerHTML = '';
                let fieldName = selectElement.getAttribute("data-option");

                res.data.forEach(item => {
                    selectElement.innerHTML += `
                        <option value="${item._id}">${item[fieldName]}</option>
                    `;
                })  
                        // res.data.forEach(item => {
                        //     // Function to create and append each option
                        //     function createOption() {
                        //         const li = document.createElement("li");
                        //         li.className = "text-gray-900 relative cursor-pointer select-none py-2 pl-8 pr-4 hover:bg-indigo-600 hover:text-white";
                        //         li.setAttribute("role", "option");
                        //         li.setAttribute("value", `${item._id}`);

                        //         const optTitle = document.createElement("span");
                        //         optTitle.className = "font-normal block truncate capitalize";
                        //         optTitle.textContent = item[fieldName];

                        //         const optCheckmark = document.createElement("span");
                        //         optCheckmark.className = "checkmark text-indigo-600 absolute inset-y-0 left-0 flex items-center pl-1.5 hidden";
                        //         optCheckmark.innerHTML = `
                        //             <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        //                 <path fill-rule="evenodd"
                        //                     d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        //                     clip-rule="evenodd"/>
                        //             </svg>`;

                        //         li.append(optTitle,optCheckmark);
                        //         selectElement.appendChild(li);

                        //         li.addEventListener("click", () => {
                        //             const allOptions = selectElement.querySelectorAll('li[role="option"]');
                        //             allOptions.forEach((opt) => {
                        //                 const checkmark = opt.querySelector("span.checkmark");
                        //                 if (checkmark) checkmark.classList.add("hidden");
                        //             });

                        //             const selectedCheckmark = selectElement.querySelector("span.checkmark");
                        //             if (selectedCheckmark) {
                        //                 selectedCheckmark.classList.remove("hidden");
                        //             }

                        //             const selectedText = selectElement.querySelector("span.block").textContent;
                        //             buttonLabel.textContent = selectedText;

                        //             selectElement.classList.add("hidden");
                        //             selectButton.setAttribute("aria-expanded", "false");
                        //         });
                        //     }
                        //     createOption();
                        // })
                console.log(this.selects);
            }
            return other;
        }))
    }
    start(){
        this.rendermenu();
        this.settingModal();
        this.getForm();
        this.renderTableHead();
        this.getAll();
        this.render();
        this.getOthers()
    };
};
