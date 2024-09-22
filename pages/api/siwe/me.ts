import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { ironOptions } from '@/utils/config';

async function meRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { siwe } = req.session;
    res.send({ address: siwe?.address });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withIronSessionApiRoute(meRoute, ironOptions);