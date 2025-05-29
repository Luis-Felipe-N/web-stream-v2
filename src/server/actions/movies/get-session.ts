'use server'

import { api } from "@/data/api";
import { cookies } from 'next/headers'; // Importar a função cookies

export async function getSession() {
    const cookieStore = cookies();
    const nextAuthSessionToken = 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..lOuu0P5RdiFPqLom.uYuM8gLSzgj4l3w0AkU6DznYftEYkT4uBhk-GAYydfVFnA4gff7BeGJguEGywusEmpfXdT7a5Arn6Hhzrn3vMwXE3krAut013sX_CenJSFlKsiSR0J1YOP-WiODKjR_QvL_p20Fa2PxL3pb4vzfu499-jb46yLJPiStY_A8M24nE1e3MlQ9O4EKG6xP1LUjgEGSezQKtKTkDOrnIqSxXIBkjLi2OlKGcEQ4eMRi_IccQtIoticrjybmyP-FZxf7prHoSCPwTTVHXungxuBEV4zaFevbGEmSBg_RFpUQXjjpH3GMtB9oik9eDJxzrQ8klbDk_6s5x_W5bba0N8Ly_k719PN3lHdWrD75Po5Y9A32i73-3qVzR5v9nRsznC_bq6qSIRg8OF6IuQ9D8uWykfUtusNdZnhKRiyIucQI9ceRkJrfF_xZyVCW_Nli_KFsegsuye8G8tS3KoPJbQFc5vucenEzv1PglOL_QO_B1cuR8WPWtAlZP0LyRjBj5Uqx9w_r3oemePY3pvM7GVVB9_vgiqJvk8UK9ctWxi_mbCLa0bMFjgvhQ7o4eVZ-T1IoBBHukZY4x0IW1s6Bqau3q1vOSUfkzXn2vuXUbrqBuipPeX5ps7-F-6wkRe5qkt6O3Dju7yKEBt9fnvXfkCo13VqEy9lL-1InGRvaHOu_qbfAH3i3tkt1xBRyIEZg7zZ5_LGGj9qySkloR0piTmwov4R23u9wWC5N2mWhLm1o5H4CN8z5HmznBgtQxSp9KzMIIEB5DCcZ4ZyQaFBAR8xbKhbGkvEwUSeBpcwLlpyAZH8W-sMc7jPt8JOUb8vkGhlZ1VjhhGStu47AR-KYRQJjMSaqdYYXX7Gk5u7VE7C5GoJcFN_Jy-i5ddSd4CXyqyciDdrVVVlOUzaE4lz8VHkOR2dyZ34zUn1QHulp9R6-jLcaLvxC1TzTRrdNEMEKT41tFyFE.1NzBUWJ8PGu_AVz6inYagg'

    if (!nextAuthSessionToken) {
        console.error('Token de sessão do NextAuth não encontrado nos cookies.');
        throw new Error('Usuário não autenticado: token de sessão do NextAuth ausente.');
    }

    const config = {
        headers: {
            'Accept': '*/*',
            'Cache-Control': 'no-cache',
            'Cookie': `__Secure-next-auth.session-token=${nextAuthSessionToken}`,
            'Pragma': 'no-cache',
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        }
    };

    const response = await api(
        'https://play.watch.tv.br/api/auth/session',
        {
            next: {
                revalidate: 0,
            },
            ...config
        },
    );

    console.log({ response })

    return {
        wtk: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJicmFuZCI6IldBVCIsImRldmljZV9pZCI6OTY0NDA2LCJsb2dpbl90aW1lc3RhbXAiOjE3NDg1MzMyNTkwMDAsInN1YiI6MTg3MDE5NSwidXNlcl9pZCI6MTg3MDE5NSwiaWF0IjoxNzQ4NTMzMjU5LCJleHAiOjE3NDg1MzY4NTksInByb2ZpbGVfaWQiOjY3Njc1NTZ9.FQufrjGzXFiudj5iCHGwUd0hEMEa5DDtNjBXB3c4ScY', // Este é o token para usar nas chamadas à API da Watch Brasil
        token: ''
    };

}