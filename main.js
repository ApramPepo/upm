const profileApp = (function () {
    let profiles = [];

    function cleanInput(input) {
        return input
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#x27;")
            .replace(/`/g, "&#x60;");
    }

    const profilePrototype = {
        greet() {
            return `Hello, my name is ${this.getName()}!`;
        }
    };

    function createUser(name, password, role) {
        let privatePassword = password;
        const user = Object.create(profilePrototype);

        user.getName = () => cleanInput(name);

        user.setName = (newName) => {
            name = cleanInput(newName);
        };

        user.checkPass = (input) => input === privatePassword;
        user.role = role;

        return user;
    }

    return {
        renderProfile() {
            const nameInput = document.getElementById('name').value;
            const passwordInput = document.getElementById('password').value;
            const roleInput = document.getElementById('role').value;

            if (!nameInput || !passwordInput) {
                document.getElementById('output').textContent = "Please fill the fields";
                return;
            }

            const user = createUser(nameInput, passwordInput, roleInput);
            profiles.push(user);
            this.displayProfiles();

            document.getElementById('name').value = '';
            document.getElementById('password').value = '';
            document.getElementById('output').textContent = `profile created for ${user.getName()}.`;
        },

        displayProfiles() {
            const profileList = document.getElementById('profileList');
            profileList.innerHTML = '';

            profiles.forEach((user, index) => {
                const li = document.createElement('li');
                li.textContent = `${user.getName()} (${user.role})`;

                const viewbtn = document.createElement('button');
                viewbtn.textContent = 'View';
                viewbtn.className = 'view-btn';
                viewbtn.onclick = () => {
                    const pass = prompt('Enter password to view profile:' + user.getName());
                    const output = document.getElementById('output');

                    if (user.checkPass(pass)) {
                        output.textContent = `${user.greet()} Role: ${user.role}`;
                    } else {
                        output.textContent = 'Incorrect Password. Please try again.';
                    }
                };

                const updatebtn = document.createElement('button');
                updatebtn.textContent = 'Update Name';
                updatebtn.className = 'update-btn';
                updatebtn.onclick = () => {
                    const newName = prompt('Enter new name:');
                    if (newName) {
                        user.setName(newName);
                        this.displayProfiles();
                        document.getElementById('output').textContent = `Name updated to ${user.getName()}`;
                    }
                };

                li.appendChild(viewbtn);
                li.appendChild(updatebtn);
                profileList.appendChild(li);
            });
        }
    };


})();

profileApp.displayProfiles();