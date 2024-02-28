import { useCallback, useEffect, useState } from 'react';
import { getPlaygroundDetail } from '../../lib/apis/playgroundApi';
import { toDoc } from '../../lib/codeplay/codeplay';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PlaygroundDetailPage = () => {
    const { id } = useParams();
    const [playground, setPlayground] = useState(null);
    const userState = useSelector((state) => state.user.user);
    const isLogin = useSelector((state) => state.user.isLogin);

    const fetchData = useCallback(async () => {
        const data = await getPlaygroundDetail(id);

        setPlayground(data.result);
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <iframe
                srcDoc={playground ? toDoc(playground.code, userState?.email) : ''}
                sandbox="allow-scripts allow-modals allow-top-navigation allow-same-origin allow-forms"
                width="100%"
                style={{
                    minHeight: '96vh',
                }}
            />
        </>
    );
};

export default PlaygroundDetailPage;
