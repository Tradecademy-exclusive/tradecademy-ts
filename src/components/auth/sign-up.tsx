import * as Clerk from '@clerk/elements/common'
import * as SignUp from '@clerk/elements/sign-in'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Icons } from '@/components/ui/icons'
import Image from 'next/image'

export default function SignUpPage() {
  return (
    <div className='grid w-full grow items-center px-4 sm:justify-center'>
      <SignUp.Root routing='path'>
        <Clerk.Loading>
          {(isGlobalLoading) => (
            <>
              <SignUp.Step name='start'>
                <Card className='w-full sm:w-96'>
                  <CardHeader>
                    <CardTitle className='py-4 w-full flex items-center justify-center'>
                      <Image
                        src={'/tradecademy-logo.svg'}
                        alt='logo'
                        width={200}
                        height={40}
                      />
                    </CardTitle>
                    <CardDescription>
                      Welcome back! Please sign in to continue
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='grid gap-y-4'>
                    <div className='grid grid-cols-2 gap-x-4'>
                      <Clerk.Connection name='apple' asChild>
                        <Button
                          size='sm'
                          variant='outline'
                          type='button'
                          disabled={isGlobalLoading}
                        >
                          <Clerk.Loading scope='provider:apple'>
                            {(isLoading) =>
                              isLoading ? (
                                <Icons.spinner className='size-4 animate-spin' />
                              ) : (
                                <>
                                  <Icons.apple className='mr-2 size-4' />
                                  Apple
                                </>
                              )
                            }
                          </Clerk.Loading>
                        </Button>
                      </Clerk.Connection>
                      <Clerk.Connection name='google' asChild>
                        <Button
                          size='sm'
                          variant='outline'
                          type='button'
                          disabled={isGlobalLoading}
                        >
                          <Clerk.Loading scope='provider:google'>
                            {(isLoading) =>
                              isLoading ? (
                                <Icons.spinner className='size-4 animate-spin' />
                              ) : (
                                <>
                                  <Icons.google className='mr-2 size-4' />
                                  Google
                                </>
                              )
                            }
                          </Clerk.Loading>
                        </Button>
                      </Clerk.Connection>
                    </div>
                    <p className='flex items-center gap-x-3 text-sm text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border'>
                      or
                    </p>
                    <Clerk.Field name='identifier' className='space-y-2'>
                      <Clerk.Label asChild>
                        <Label>Email address</Label>
                      </Clerk.Label>
                      <Clerk.Input type='email' required asChild>
                        <Input />
                      </Clerk.Input>
                      <Clerk.FieldError className='block text-sm text-destructive' />
                    </Clerk.Field>
                  </CardContent>
                  <CardFooter>
                    <div className='grid w-full gap-y-4'>
                      <SignUp.Action submit asChild>
                        <Button disabled={isGlobalLoading}>
                          <Clerk.Loading>
                            {(isLoading) => {
                              return isLoading ? (
                                <Icons.spinner className='size-4 animate-spin' />
                              ) : (
                                'Continue'
                              )
                            }}
                          </Clerk.Loading>
                        </Button>
                      </SignUp.Action>
                    </div>
                  </CardFooter>
                </Card>
              </SignUp.Step>

              <SignUp.Step name='verifications'>
                <SignUp.Strategy name='password'>
                  <Card className='w-full sm:w-96'>
                    <CardHeader>
                      <CardTitle>Check your email</CardTitle>
                      <CardDescription>
                        Enter the verification code sent to your email
                      </CardDescription>
                      <p className='text-sm text-muted-foreground'>
                        Welcome back <SignUp.SafeIdentifier />
                      </p>
                    </CardHeader>
                    <CardContent className='grid gap-y-4'>
                      <Clerk.Field name='password' className='space-y-2'>
                        <Clerk.Label asChild>
                          <Label>Password</Label>
                        </Clerk.Label>
                        <Clerk.Input type='password' asChild>
                          <Input />
                        </Clerk.Input>
                        <Clerk.FieldError className='block text-sm text-destructive' />
                      </Clerk.Field>
                    </CardContent>
                    <CardFooter>
                      <div className='grid w-full gap-y-4'>
                        <SignUp.Action submit asChild>
                          <Button disabled={isGlobalLoading}>
                            <Clerk.Loading>
                              {(isLoading) => {
                                return isLoading ? (
                                  <Icons.spinner className='size-4 animate-spin' />
                                ) : (
                                  'Continue'
                                )
                              }}
                            </Clerk.Loading>
                          </Button>
                        </SignUp.Action>
                      </div>
                    </CardFooter>
                  </Card>
                </SignUp.Strategy>

                <SignUp.Strategy name='email_code'>
                  <Card className='w-full sm:w-96'>
                    <CardHeader>
                      <CardTitle>Check your email</CardTitle>
                      <CardDescription>
                        Enter the verification code sent to your email
                      </CardDescription>
                      <p className='text-sm text-muted-foreground'>
                        Welcome back <SignUp.SafeIdentifier />
                      </p>
                    </CardHeader>
                    <CardContent className='grid gap-y-4'>
                      <Clerk.Field name='code'>
                        <Clerk.Label className='sr-only'>
                          Email verification code
                        </Clerk.Label>
                        <div className='grid items-center justify-center gap-y-2'>
                          <div className='flex justify-center text-center'>
                            <Clerk.Input
                              type='otp'
                              autoSubmit
                              className='flex justify-center has-[:disabled]:opacity-50'
                              render={({ value, status }) => {
                                return (
                                  <div
                                    data-status={status}
                                    className='relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md data-[status=cursor]:ring-1 data-[status=selected]:ring-1 data-[status=cursor]:ring-ring data-[status=selected]:ring-ring'
                                  >
                                    {value}
                                  </div>
                                )
                              }}
                            />
                          </div>
                          <Clerk.FieldError className='block text-center text-sm text-destructive' />
                          <SignUp.Action
                            asChild
                            resend
                            className='text-muted-foreground'
                            fallback={({ resendableAfter }) => (
                              <Button variant='link' size='sm' disabled>
                                Didn&apos;t recieve a code? Resend (
                                <span className='tabular-nums'>
                                  {resendableAfter}
                                </span>
                                )
                              </Button>
                            )}
                          >
                            <Button variant='link' size='sm'>
                              Didn&apos;t recieve a code? Resend
                            </Button>
                          </SignUp.Action>
                        </div>
                      </Clerk.Field>
                    </CardContent>
                    <CardFooter>
                      <div className='grid w-full gap-y-4'>
                        <SignUp.Action submit asChild>
                          <Button disabled={isGlobalLoading}>
                            <Clerk.Loading>
                              {(isLoading) => {
                                return isLoading ? (
                                  <Icons.spinner className='size-4 animate-spin' />
                                ) : (
                                  'Continue'
                                )
                              }}
                            </Clerk.Loading>
                          </Button>
                        </SignUp.Action>
                      </div>
                    </CardFooter>
                  </Card>
                </SignUp.Strategy>
              </SignUp.Step>
            </>
          )}
        </Clerk.Loading>
      </SignUp.Root>
    </div>
  )
}
