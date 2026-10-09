import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'

const Login = () => {
    const { user, loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ error, setError ] = useState("")
    const [ submitting, setSubmitting ] = useState(false)

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setSubmitting(true)
        try {
            await handleLogin({ email, password })
            navigate('/')
        } catch (err) {
            setError(err.customMessage || err.response?.data?.message || err.message || "Login failed. Please verify credentials.")
        } finally {
            setSubmitting(false)
        }
    }

    if (loading) {
        return (
            <main className="auth-page">
                <div className="auth-card">
                    <p style={{ textAlign: 'center' }}>Loading session...</p>
                </div>
            </main>
        )
    }

    return (
        <main className="auth-page">
            <div className="auth-card">
                <div className="auth-header">
                    <div className="brand-badge">✨ AI Interview Master</div>
                    <h1>Welcome Back</h1>
                    <p className="subtitle">Sign in to access your custom interview prep dashboard</p>
                </div>

                {user && (
                    <div className="info-banner">
                        <span>Logged in as <strong>{user.email || user.username}</strong></span>
                        <button className="button secondary-button" onClick={() => navigate('/')}>Go to Dashboard →</button>
                    </div>
                )}

                {error && (
                    <div className="error-banner">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="input-group">
                        <label htmlFor="email">Email Address</label>
                        <div className="input-wrapper">
                            <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                            <input
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email" id="email" name="email" placeholder="name@company.com" />
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-wrapper">
                            <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                            <input
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password" id="password" name="password" placeholder="••••••••" />
                        </div>
                    </div>

                    <button disabled={submitting} className="button primary-button btn-full">
                        {submitting ? "Signing in..." : "Sign In →"}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Don't have an account? <Link to="/register">Create an Account</Link></p>
                </div>
            </div>
        </main>
    )
}

export default Login