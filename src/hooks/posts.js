import { useState } from "react";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const host = `https://anonymous-social-bt77.onrender.com/api/v1/posts`


export function useGetPosts() {
    const [isLoading, setisLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    const fetchPosts = async () => {
        setisLoading(true);
        setError(null);
        try {
            const response = await fetch(`${host}/getposts`);
            const responseData = await response.json();
            if (response.ok) {
                setData(responseData.posts);
            }
            else {
                throw new Error(responseData.message);
            }
            setisLoading(false);
        }
        catch (err) {
            setError(err.message);
            setisLoading(false);
        }
    }

    return { isLoading, error, data, fetchPosts };


}

export function useAddPost() {
    const [isLoading, setisLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    const addPost = async (content) => {
        setisLoading(true);
        setError(null);
        try {
            // Get the authentication token from wherever it's stored (e.g., localStorage, cookies)
            const authToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImF2YXRhciI6eyJ1cmwiOiJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUhrQUFBQjVDQU1BQUFBcUpINTdBQUFCRkZCTVZFWC93Z0JtY0huLzZiLy8vLytLVzBMdTd1L3Q3ZTc2M2FUNysvdi93QURleEpMNCtQbnk4dlAvNkx6L3hBRC94Z0JnYTNYLzdzTnNjM3FNakl1SFdFT0VWVVJDU0ZUajRkNnZzck4zZm9MLysvUC8zcDJBVVVYNzJJMWhibnY5MVlEK3oyais5TnovekZTQ1R6Zit4alZZYW42UmpvYnYwNTMreWtEMDhldVNZejlNVTE2ZG9xYit5Q1Q1NThiOXlVbjB1aERpcVI3YW95S2ViVHl6Z1RUbHpxTEdsQ3IvK09oVlhXalAwTkh1OHZ2eDVjLzA3TjM5MG5QUW1pakNqaTZuZHpkM1QwanNzUmVVYUUyZmdXekNublBEcG9iUXVwUEt1NkcybG5LdWpYS3FoV1NhZGx2RmxrS3lmeVc4b0czbDFyVi9lV3UybGttdHFKeXJrRlNUaEdqSm9UeVpoMkNmbElEanREZWZoRk92cEk1Nm9pcldBQUFMc2tsRVFWUm9nYldiQ1YvYVRCckFFeUVKSVNkSUZFU2dDQlFGUlR6d29IaFV1MUo3cmJhMjIrUDdmNCtkbVZ4ekQrKzc3ejc5YVdNSTg1L25uTWxrb2hXZ3VJWmhtQTQ4Y2t4dzZLS1RCanhab2s3TzUrNWlZclU2cjNZUE5DZ0h1Njg2TFd2eXhwaFREWlhnZHd4eFE2YTJLdG1FSjd0ZXB3OXd0bTFydWNDL2JMdmY4cnIvSC9KOHI5THFhd1NTRlBCUnZ6WFptLyt6Wk1PY2RQb1Nhazd2ZHliL0M1bit3bDd6Y0FWc1NqOXNibkhJV2V0bVNuYWhPQ1VnVG5aVVFpZlRvMFZMV3htYmFONWE1Ri9IajNLT1c5Smdod3lrbVl0MUtPdnZmSEVsVnRmM0F5QmM5dFVpYThnc1pLM25makFMQ3ZKV1I0Z0Z6T25SOWMzdG1VRHhxNjNVMEhTK0lTUk5Oa2h5VTJUbklQQ1BUMGRSRkwyOTlrVTIxNXB5c2drbElRTkp5RUNNd3VSUXhQV1BUb3RSclZnc1JzYzhZNmZzd3k1cXM1QzFubGdibmRRY0pNajk1RkdwS1dqUUQ0NU9FQmFBVHhIWWp4MGUrSXorelZMU0pOMjY0MnBVaDV4WVhWQ3Vka1FLVDc4a1hDQlR3UFMxNmZUb0dNalJOUDRUVjN2bkhKZzhNNnVEbVZWVVNUdzJvdjFZNGVOaWxIS2ptMEM3dTdrZFJkdmIyMi9mZ2wvUnllbTFUYkJ0emZ0ck5hekZLaHdjMlJCOHVsM001ZXkwdHAwYkFFZ04vSDE3UkxKYmN4a1pXRGdqZzA4NWxnN096Z0pnNlZHRWNZb0VOYU8vcmQwUjZKMDVNL1JBTWh0aHpxTFBBZDhVQWZpdXlFT1IzR2gwTXlXL2EvZjNIRTZFc1ZuVjNlVnB2UDBsQ0k3VTRPamtXQXZvRUxkM3U1eXNZaXBKOTRBRFBxNUYxeXRvWEJ0ZCt3d1hvZys2cWhwbU91ZDk5b3YrRkJqeGVLcldlSFE4blU1dG4wMXN1NzlRVmM4OWpxbTE0RFlxUnRjblNuQ3hCaktyT0xxOXVXTXREdEhraUFGOWJpVGpQemprQkJld05RcG9OVGpsUjl1ajB5bk43aHV1a2VnTW1RV3FobkVMVnpCYUdacEp0QTNZcE1GM1pEV01VMENneXR0cUVvZGR2S2JRTFhFTjg3aWxPbGpCd1J5cFJWK29obXhQUk81eXdmNzBiNmxjTzdsakI5QTNCbzlzbFBpalUzQVRxVGtzZURUbGpOdzdPZG5Bc3FySkh4Yjl2MlZzL3BUQmJ2THl1Y3ZsQW1QelZhNzFVdUYrUExMNXM2UnVRc2FyNXlHZnpJbHNRTHQvOTYrSDVYSUc1UDNENDZjaWc2K2RDbVpKaDZ6T0FsdHJ3U2xwN0Y3eDNjUE1xeUJaVzF1TC81KzkvMURzclVRRzlxWm1nRnY4QzRIZ2J1N1ZQaTY5R0VrS3BPTndJVm5UdHRLeEtyNEJtSXZtMWY1MGhIRWZuampVSFA2UXNXc253c2x3Wng0ams2eGFpQ2IwL2wwTy92Z2t4Q2J3dGNkTTdha1F2U0R5K1Vwa0cvOG9EYkRhZzRLTDJNdms2dTBqSWZrS0p3dFZ6a083OTU0RmU4a1BqcDdGbDBkblFrZmI1eGlaTzFMRTVMTTRuWHNmS2lRei9vZU9QQktOREY2N0ZaTmIrUXh3VDNRUlZqczlITXFSN0dRRiticDJJbTVUMjROUW1GV3VLSmNoK1RRbWY2eFFBTFlYNldHczlFZ1lZaUNualhRR0tDaGZNUm1sYysreGdqZWVHTnZEL3NEa0h2WDFUa2pXRHMya2hrMGtTd0pwQ2Z1SXVabHJiZXlUVHlxeVBVRmtjMzRsSTMrSnJYMmZ0ZXZ4WU1ScHBITWtUQ3NnblRtYUFlNXg1cms1T1kzdFdRVUhlTWt2THp0YWk0MFBmK0tFbHQxWjkvZmNFc2lxaW16OUpiaE9ZaHVaMjJQMFN6dVE5NkR5MEZQcWJGZFFQb3VUV2NOcVdHOVpXU1AxNVRzNWRiT2MzRUprbWJFQk9ac1lZTkdkQnpYV2hmaW9za3hLdHlUQ2dMa2hXVEFYU2NuVGJNQ1k1QlN5YkhxNXU3MjFTcXl5TEoraGRBMU5NTlhOMGRuNGpIRjRJWjNHUURwTVNsdTFQVU1UanN5SnBPV3o5MUJaazdvM2tYVEVFRThORUxsVDBPWlNOME56MTNJd1FmTnd6Zk93aXl0WVRlcG02R2pObFlNQituT0VhK3lSVVlhTlZYaUVSVitrS2dPbEM5b2JCYmpmdEpJU3hyTXh4L3BvckxvZjdpaklYVzBpditMQXNxd1A2WUN4UnFVUkh1dGVkc0xyRld0RHl4S3RweVhraVdiSkE2d0Z5TXRlVWpzOUhFbW82K0VkdWU5OUJOK3k1Q3BabXJTQ2FYNFROREdzRlhFRFl6WE1JMTJmbE05M3ZTVWs3OHBWMHVSSkJZMXRXZmVmTUdYSkNrSnFuVHE2ckNaZmFhK2tuMnRRWit2RE8ycjJSOWNTY2liMldQUGd0K1RwK2txVDk4eStnbTA4d0FETGg2U01oUVVXZGxoNUxNSXZpWmFLRXpuUUR1UVg5R0VqNVN5MEtaZlM2aVk2b3dCVHBKV0NteWc5WEZLVms0NXJJczRxajlETkxVWERTbktjVnhabDV2U1FVUmlkR3FxOXZKSWNOQkdaTVhEKzIvT0lUcTFCc0dRNnU3ckFuTVkwNXR6U2tQTVVUNWxScTh1VnhZUlJyQ3ViWGJCclNoOURVY1oyeXNiRDJtTjZRSFNxdzFrczVwRlhzOHNCT1JLekZzL1BlS3Zwc3F1cVlZbllMWHFjSXR5TDF4YjVRSkRKSzBYZHptU0g4VFJ2YkFZeStiZDg2cGZLbFdLc3lzVml0TXZpT2Z1QnY1NEd6NXhsUjBic2xxWVlSaFB4djM2cjRMbURGWkgwTUk2enlyZXdYVlhNd1JEWlVzMUpZZ2xlQnZwRVl1L2M4Qk5kMTlzTlRZa0djNUkzSzFnYmdzTnYrUnlRbUJzUVBRRXFRL1N6bXR6VkREVTUrRHFBelUzdzFNRnFKejZBUGtHd3JnOWVsSzVXejdlQmozOUJzQjcrcEJlSE9BUGs2NWlzRDM0cHRBYnpiZm10SkFScnoyM1VXdmhVZ2JxeUZTVFR1UEkwaU1GNis3dWNiTGZteXZ1cXhOYVF2RTZFTTE0OVVsbFBWRllxRGUrckZQZVM0TzZtbXJYMnAwS3FTaC8rYWFlWEFxWGxub2Iza3ZMN1p5MzRNY2lhUS9ibXpQMlMyMWp2ZGFZeUVQWDlzOExSL25PdVNGak5tV3g0ZVdXY1BQZ3EyNEhRUWp0WlpJdFN1TEVKVjJNWmxmcThUSkNsT1cxUFhMZ2VKbDBiOG84SEdGbXZEaXRVYUdYRFZaa2s2MVhKeU5FMzBVcWNmRDNzQjBVZXBucXVFWEFJSnNsdFNYUjM1aXVzQWI2MFNYSzVUQ1Z5cGpGRkh2d1FMM3hPMHVjWXNuWFAvMUJrZ0NZSGlreGpoaXdNc2NOc0o0dHNyZmMzU1o1WkFEMGpFOW1ieGVEeXVyNFMyVzZpVldhNHlyMGxJWDhtL055ZWdYc2RJRE12THlyRGNpcnRGY2xiSzYzcGt4SFdobmZHaURLY2dVbXZOOHV4NWZLU3VGUVhSVmk2cHE5NGprRmxWZmdIM2tEZ09FeCs0bTdXbjZlQ0pvbm5HSkpuTjBRbDBjT0dKVVkzQ092OEZqMmxTNS9keEkrdHpvWFBxNEx2aFBlZ282M1U0cVFzQ1pXRmt6SDdQSGxTbGp3ZDVFOSsvZUR1aGRCWmIvK015YXphdzlla3NlOTRHMHZRNmgrNWs0WDdYREtZL3RiSnFNbVZwdlFlV3NzMmVaMytvbkh0dmFWK0Z1djdYd2R0blpid3RZWEpFQWs2Yk5CWERxclhyTnJZczFqaDgrZmdWNVhXTjI1d2FmSGtKOXRKZmZDYjJVeHp5SG55VFU2OEErMkZvM0RjM293RC9zTzllUEI4UkZsOEFuZk14RG9YMG8wN2M3eWNCTCtlQlZ3ZGxWQUd6RFVQOEhiNEdWZmJiczROems0V2JHOUY4RU1YZzBGUzAyZ1JHTEpmTURDMnQ0TFlUM0tlZ1Q4ekxSRVpFellJWDFQNWRFRitFNS8xTHdUa2RBSk1WVXhlYytIN0hMeHNFUGE1b0M3TloyVGNQVFRKamlYa2FyL1BzWFE0cG5yeU9sT1l2UHFDdWhDaTR3ZElhTjhRdG1NSjJ4OEdvZ3k2MnYvTzh6SGRZb2lHTGV0bkdKS1hiWkIvSTZuQ0tJTWJFU1U3MDl5K1RZMkxtWXczcUJQdFJ2bFBTSGF5T3VhQlkxZjM1L2llT0hZZjRHTFhGdVhUZUl4YURSdHA0MkhHVFdzN0h3dzZPZFYyRjRyZGVFNVhvRElBYld5QTRBbjNuVXU2K1lacHdsT2hDQXlVUG1EM0FUSzdMczJHNE91dzVYRVkxdDNOS25WKzNYRWIwTVVpTUNqMlhYYlhaYjUvUGRuSzdtd0swY0NhRzJNQkdYRFpxRTR2YUpqMGh2eDhMek8ycjljVmF3MzEyamQ0NUZDc01BSnpkdGZpbFNUNXpIWFd4YTFzN0R1YlkzTDJFVFpLRGxNL3lJNnR2cGU1TGtiWGpVMW85SXN3bGd0Z0JyMWtNS056SmhkMVI3NlhtZG81ZmhrSzJHSGQzQVF3WE1ickpWZEVEc05MMGM1eGh5OGxVMkJ4Rk50QTFmRjRES0V3eVlFNVRRRTVYTjhzQ1FqQ053UmNvODVWRzFxN21xaVRYQURJZkd2REZIU0Zid2d3ZTVrUkdSMXgweXNuWTRvNVhHdUhqVTNrWWlxVVZub2ZnNk0ybjh6UkdTaXNmaFBFRkw2RDR1eGZVR3dZWVN5WjhYTjRzZThXNUcrL0tONzRLWmdVZXlXZHcvRytXY2hmN3VHLzhjUFdNTU1rMzNJeUNadXY0R2RnWnhOL2F5ZzNxNnFHTVc5MkdmVkdCdWVQR0xuT1lkaW91NFYvN0oweTE3M2NiOFJKSkNPREs2cjdsekh1SDN1UHpuWGNUYWg1S0xJMi9LaFJ2elFjOTYrOXpVYjZPU0diakh0TW9Eb2c2eUhtZVhBTWRLNENxa2xIY0Jvd3ZOWk4yVnRPMmNtczlLRCtPbTY5dnIvZWlEM2JhS3p2MXk4TERqeHRKT1hLSVJzUzFMRC9BZ1BaYTlSWTZiN0lBQUFBQUVsRlRrU3VRbUNDIiwibG9jYWxQYXRoIjoiaW1hZ2VzLyIsIl9pZCI6IjY0YzQzYmZjMzYzMWUzOGFjYmMyNjE4OSJ9LCJ1c2VybmFtZSI6InNhaGlsIiwicGFzc3dvcmQiOiIkMmIkMTAkS0hIZFRGaHJLL2dZQXVIZVVLMmUvZWVReXlFYWhIQWhaRkQ2WHM4aC5OSjZIRk9KZ05OQzYiLCJfaWQiOiI2NGM0M2JmYzM2MzFlMzhhY2JjMjYxOGEiLCJjcmVhdGVkQXQiOiIyMDIzLTA3LTI4VDIyOjA2OjUyLjY5MloiLCJ1cGRhdGVkQXQiOiIyMDIzLTA3LTI4VDIyOjA2OjUyLjY5MloiLCJfX3YiOjB9LCJpYXQiOjE2OTA1ODIwMTMsImV4cCI6MTY5MDY2ODQxM30.3csWK2d50cqu88s93r5DuTcgt9WQhlsOcLkY-ZmvV_U`;

            const response = await fetch(`${host}/createpost`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`, // Include the authorization token here
                },
                body: JSON.stringify({
                    content
                }),
            });
            const responseData = await response.json();
            if (response.ok) {
                setData(responseData.post);
                toast.success('post added successfully');
            } else {
                toast.error(responseData.msg);
                throw new Error(responseData.message);

            }
            setisLoading(false);
        } catch (err) {
            setError(err.message);
            setisLoading(false);
        }
    };

    return { isLoading, error, data, addPost };
}