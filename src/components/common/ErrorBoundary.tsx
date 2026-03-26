import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('ErrorBoundary caught an error:', error);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="shell-container py-10">
          <div className="surface-card px-6 py-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 text-2xl">!</div>
            <h2 className="text-2xl font-bold text-ink">页面渲染失败</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
              页面遇到了运行时异常。你可以刷新页面重试；如果问题持续出现，请继续告诉我。
            </p>
            <button className="btn-primary mt-6" onClick={this.handleReload}>
              刷新页面
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
