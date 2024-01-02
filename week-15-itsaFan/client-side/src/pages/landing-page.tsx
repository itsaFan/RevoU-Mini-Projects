import { Card, Divider } from "antd";

export default function LandingPage() {
  return (
    <div className="flex justify-center mt-5">
      <div className="flex-col">
        <h1 className="font-semibold text-2xl mb-5">Hello &#128075;, Visitor</h1>
        <div>
          <Card title="Guide to use this web app">
            <p>This web app is still in progress.</p>
            <p>You can register and login, but the default registered account role is set to 'user'.</p>
            <p>The content for 'user' role is not available yet.</p>
            <p>So if you try to login with your own registered account, you will be directed to blank page.</p>
            <Divider />
            <p>For this RevoU assignment week 15, only need an account with 'leader' role.</p>
            <p>This account will be able to perform CRUD on Task. </p>
            <p>I will provide you with the account, you can try login and test the functionality.</p>
            <p>Username: Leader</p>
            <p>password: zxc12345</p>
            <Divider />
            <p className="font-bold">Added For Assignment Week 15:</p>
            <p>To see or check if this app protected again common web vulnerabilites like click-jacking</p>
            <p>At the user dashboard, there are two iframe</p>
            <p>it will not display anything because the server is using helmet</p>
            <p>To guard against frame tag, and only allow self-origin</p>
            <p>Try Login an account here:</p>
            <p>Username: User</p>
            <p>password: zxc12345</p>
            <Divider />
            <p className="font-semibold text-base">To login or Register, click on the Avatar Icon at the Top Right Screen</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
