# Quick Fix Script - Update all mismatched field names
# This updates the code to match the actual Prisma schema

\ = @{
    'src\app\api\auth\login\route.ts' = @(
        @('user.loginAttempts', 'user.failedLoginAttempts'),
        @('loginAttempts:', 'failedLoginAttempts:'),
        @('user.isAdmin', 'user.adminRole !== ''NONE'''),
        @('user.subscriptionTier', 'user.plan')
    )
    'src\lib\auth.ts' = @(
        @('isAdmin:', 'adminRole:'),
        @('isAdmin', 'adminRole !== ''NONE'''),
        @('select: { isAdmin: true }', 'select: { adminRole: true }')
    )
    'src\lib\inngest\functions.ts' = @(
        @('creditsRemaining:', 'credits:'),
        @('user.creditsRemaining', 'user.credits'),
        @('verificationTokenExpiry:', 'resetTokenExpiry:')
    )
    'src\app\api\auth\signup\route.ts' = @(
        @('verificationTokenExpiry:', 'resetTokenExpiry:')
    )
    'src\app\api\auth\verify-email\route.ts' = @(
        @('verificationTokenExpiry:', 'resetTokenExpiry:')
    )
    'src\app\admin\layout.tsx' = @(
        @('user.isAdmin', 'user.adminRole !== ''NONE''')
    )
    'src\app\admin\page.tsx' = @(
        @('subscriptionTier:', 'plan:')
    )
    'src\app\api\admin\grant-admin\route.ts' = @(
        @('user.isAdmin', 'user.adminRole !== ''NONE'''),
        @('isAdmin:', 'adminRole:'),
        @('adminId:', 'performedBy:')
    )
}

Write-Output "Fields in the Prisma User model that actually exist:"
Write-Output "- failedLoginAttempts (not loginAttempts)"
Write-Output "- adminRole (not isAdmin)"  
Write-Output "- plan (not subscriptionTier)"
Write-Output "- credits (not creditsRemaining)"
Write-Output "- resetTokenExpiry (not verificationTokenExpiry)"
