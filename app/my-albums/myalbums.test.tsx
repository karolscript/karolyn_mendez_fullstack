import '@testing-library/jest-dom';
import { act, render, screen, waitFor } from '@testing-library/react';
import MyAlbums from './page';

interface MockData {
  user: {
    name: string;
    email: string;
    sub: string;
    expires_at: number;
    accessToken: string;
    iat: number;
    exp: number;
    jti: string;
  },
  expires: string;
}

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({
      user: {
        name: "Karolyn Méndez",
        email: "karo.wms@gmail.com",
        sub: "31hxuvqogukaudwmrae4c5dhiipa",
        expires_at: 1711083586,
        accessToken: "BQD6UCO9WZfGZ4Z8wbqrP2vrPCvZCiOLo9uhRMnmRDCRPZ-HGeTSnnifAvdEnpVo808wfgLtJC1gNCI_uVzINF_FQhBDXUiWZQpx3yUV4i-gJO0So8s_vdgS_JEzTn1smDz26gDTIricE5UTQ13fy7LxYjgJoht-h-eRuEv428G15YYFKhPgzGigrBeVJmx96uZLNzwY35JwHPcL60YHpebh6WayKQxHYFD2zSxOFdF50dvQk8UyFqSjZ2D5ORISX7s0ogriIWOytEvt-qxcwfZ2MMtP0d68IfiRKiPxOa2KjxKYJu-n8pcG44UE9Poi8jeheeepYA",
        iat: 1711080045,
        exp: 1713672045,
        jti: "a0e5b601-b831-45ef-8ab4-9dead716a9f1",
      },
      expires: "2024-04-21T04:00:45.971Z",
  } as MockData)),
}));
const mockUseSession = jest.fn();
const mockHandleRemoveAlbumAPI = jest.fn(); 

describe('MyAlbums', () => {
beforeEach(() => {
  mockUseSession.mockReturnValueOnce({
      user: {
        name: "Karolyn Méndez",
        email: "karo.wms@gmail.com",
        sub: "31hxuvqogukaudwmrae4c5dhiipa",
        expires_at: 1711083586,
        accessToken: "BQD6UCO9WZfGZ4Z8wbqrP2vrPCvZCiOLo9uhRMnmRDCRPZ-HGeTSnnifAvdEnpVo808wfgLtJC1gNCI_uVzINF_FQhBDXUiWZQpx3yUV4i-gJO0So8s_vdgS_JEzTn1smDz26gDTIricE5UTQ13fy7LxYjgJoht-h-eRuEv428G15YYFKhPgzGigrBeVJmx96uZLNzwY35JwHPcL60YHpebh6WayKQxHYFD2zSxOFdF50dvQk8UyFqSjZ2D5ORISX7s0ogriIWOytEvt-qxcwfZ2MMtP0d68IfiRKiPxOa2KjxKYJu-n8pcG44UE9Poi8jeheeepYA",
        iat: 1711080045,
        exp: 1713672045,
        jti: "a0e5b601-b831-45ef-8ab4-9dead716a9f1",
      },
      expires: "2024-04-21T04:00:45.971Z",
  } as MockData);
});

  it('renders "Mis albumes" text', async () => {
    render(<MyAlbums />);
    const misAlbumsText = await screen.findByText('Mis albumes'); 
    expect(misAlbumsText).toBeInTheDocument();
  });
});
