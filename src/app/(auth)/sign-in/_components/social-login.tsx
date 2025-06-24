import { AppleSignInButton } from "./social-buttons";
import { GoogleSignInButton } from "./social-buttons";
import { MetaSignInButton } from "./social-buttons";

export function SocialSignIn() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <AppleSignInButton />
      <GoogleSignInButton />
      <MetaSignInButton />
    </div>
  );
}
