import { client } from '@/lib/prisma';

type props = {
  fullname: string;
  clerkId: string;
  type: string;
};

export const onCompleteUserRegistration = async ({ fullname, clerkId, type }: props) => {
  try {
    const registered = client.user.create({
      data: {
        fullname,
        clerkId,
        type,
        subscription: {
          create: {},
        },
      },
      select: {
        fullname: true,
        id: true,
        type: true,
      },
    });

    if (registered) {
      return { status: 200, user: registered };
    }
  } catch (error) {
    return { status: 400 };
  }
};
