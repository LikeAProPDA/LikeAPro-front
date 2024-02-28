export const basicPlaygroundHtml = `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <!-- 아래처럼 부트스트랩 link를 걸 수 있습니다. -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

        <!-- '/head'를 기준으로 파싱하여 자체 api를 제공합니다. 양식을 지켜주세요. -->
    </head>
    <body>
        <h1>플레이그라운드</h1>
        <div>플레이그라운드는 유저가 직접 코드를 작성하여 사용할 수 있는 기능입니다.</div>
        <div>자체적으로 제공하는 API와 여러분들의 API를 활용하여 여러 기능들을 만들어주세요!</div>
        <div>
            <small>서버용 플레이그라운드는 추후 업데이트 예정입니다.</small>
        </div>
        <h3 class='mt-4'>예제</h3>
        <button id='btn' class='btn btn-primary'>
            내 이메일 확인
        </button>
        <h3 class='mt-4'>지원하는 API</h3>
        <ul>
            <li>getUserEmail(): string | undefined -> 로그인된 유저 이메일을 반환합니다.</li>
            <li>getUserNickname(): string | undefined -> 로그인된 유저 이메일을 반환합니다.</li>
            <li>isLogin(): boolean -> 유저가 로그인 되어 있는지 확인합니다.</li>
        </ul>
        <!-- 아래처럼 스크립트 파일을 사용할 수 있습니다. -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        <script>
            // 여기서 자바스크립트를 사용할 수 있습니다.
            const btn = document.getElementById('btn');
            btn.onclick = () => {
                alert(getUserEmail());
            }
        </script>
    </body>
</html>
`;

const getUserEmailApi = (email) => {
    return `
        <script>
            const getUserEmail = () => {
                return '${email}';
            }
        </script>
    `;
};

const getUserNickname = (nickname) => {
    return `
        <script>
            const getUserNickname = () => {
                return '${nickname}';
            }
        </script>
    `;
};

const isLogin = (login) => {
    return `
        <script>
            const isLogin = () => {
                return ${login ? true : false};
            }
        </script>
    `;
};

export const toDoc = (code, email, nickname, login) => {
    if (!code.includes('</head>')) {
        return code;
    }

    const codeBlocks = code.split('</head>');
    let html = codeBlocks[0];

    html += getUserEmailApi(email);
    html += getUserNickname(nickname);
    html += isLogin(login);

    html += '</head>\n' + codeBlocks[1];
    return html;
};
